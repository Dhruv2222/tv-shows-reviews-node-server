import db from "../Database/index.js";
import * as dao from "./dao.js";
import * as review_dao from "../Profile/dao.js";
export default function UserRoutes(app) {

  app.get("/api/users", async (req, res) => {
    // res.send(db.users);
    const users = await dao.findAllUsers();
    res.json(users);
  });

  app.get("/api/users/profile", async (req, res) => {
    if (!req.session.currentUser) {
      res.status(401).send("Not logged in");
      return;
    }
    res.send(req.session.currentUser);
  });

  app.get("/api/users/logout", (req, res) => {
    req.session.destroy();
    res.send("Logged out");
  });

  app.get("/api/users/reviews/:userId", async (req, res) => {
    const userId = req.params.userId
    const reviews = await dao.getReviewsByUserId(userId);
    res.json(reviews);
  });


  app.get("/api/users/:userId", async (req, res) => {
    const userId = req.params.userId
    console.log("XYZ", userId)
    // const user = await dao.findUserById(userId);
    const user = await dao.findUserByUsername(userId);
    res.send(user);
  });

  app.put("/api/users/:userId", async (req, res) => {
    const { userId } = req.params;
    const updateUser = req.body;
    console.log("XYZ", updateUser)
    const op = await dao.updateUser(userId, updateUser);
    console.log("XYZ", op)
    res.sendStatus(204);
  });

  app.delete("/api/users/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
      const result = await dao.deleteUser(userId);
      if (!result || result.deletedCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      try {
        const deleteReviewsResult = await review_dao.deleteReviewsByUsername(userId);
        res.json({
          message: `User with ID ${userId} and all related reviews deleted successfully.`,
          reviewsDeleted: deleteReviewsResult.deletedCount
        });
      } catch (reviewError) {
        console.error(`Failed to delete reviews for user ID ${userId}:`, reviewError);
        res.json({
          message: `User with ID ${userId} deleted successfully, but an error occurred while trying to delete related reviews.`,
          error: reviewError.message
        });
      }
    } catch (error) {
      console.error(`Failed to delete userId with ID ${userId}:`, error);
      res.status(500).json({ message: "An error occurred while trying to delete the user." });
    }
  });
  app.delete("/api/users/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
      const result = await dao.deleteUser(userId);
      if (!result || result.deletedCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      try {
        const deleteReviewsResult = await review_dao.deleteReviewsByUsername(userId);
        res.json({
          message: `User with ID ${userId} and all related reviews deleted successfully.`,
          reviewsDeleted: deleteReviewsResult.deletedCount
        });
      } catch (reviewError) {
        console.error(`Failed to delete reviews for user ID ${userId}:`, reviewError);
        res.json({
          message: `User with ID ${userId} deleted successfully, but an error occurred while trying to delete related reviews.`,
          error: reviewError.message
        });
      }
    } catch (error) {
      console.error(`Failed to delete userId with ID ${userId}:`, error);
      res.status(500).json({ message: "An error occurred while trying to delete the user." });
    }
  });


  app.post("/api/users/register", async (req, res) => {
    const { username, password } = req.body;
    const existUser = await dao.findUserByCredentials(username, password);
    if (existUser) {
      res.status(400).send("Username Already exists");
      return
    }
    // res.json(currentUser);

    const newUser =
      dao.createUser({ username, password });
    // {
    //   ...req.body,
    //   _id: new Date().getTime().toString(),
    // };
    // db.users.push(newUser);
    req.session["currentUser"] = newUser;
    res.send(newUser);
  });





  app.post("/api/users/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await dao.findUserByCredentials(username, password);
    // const user = db.users.find(
    //     (u) => u.username === req.body.username && u.password === req.body.password
    // ); 
    if (user) {
      req.session.currentUser = user;
      res.send(user);
    } else {
      res.status(401).send("Invalid Credentials");
    }
  });
}