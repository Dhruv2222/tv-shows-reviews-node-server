import cors from "cors";
import express from "express";
import Hello from "./Test.js";
import session from "express-session";
import AuthRoutes from "./Auth/routes.js";
import UserRoutes from "./Users/routes.js";
import ReviewRoutes from "./Profile/routes.js";
import WishlistRoutes from "./WishList/routes.js";
import mongoose from "mongoose";
import SearchRoutes from "./Search/routes.js";
import ShowRoutes from "./Show/routes.js";





mongoose.connect("mongodb+srv://Cluster89442:aXF2Zm56TlRE@cluster89442.0fq4prg.mongodb.net/sample-d");
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

const assignmentSchema = new mongoose.Schema({
  _id: String,
  title: String,
  course: String,
});

// Create a model
const Assignment = mongoose.model("Assignment", assignmentSchema, "s");

// Define an async function to run the query
async function retrieveAssignments() {
  try {
    // Run the query
    const assignments = await Assignment.find({ course: "RS103" }).exec();
    console.log("Assignments for RS103:", assignments);
  } catch (error) {
    console.error("Error:", error);
  }
}

retrieveAssignments();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    credentials: true, // Allow cookies and HTTP authentication to be sent
  })
);
app.use(express.json());
app.use(
  session({
    secret: "pizza is best",
    // cookie: {secure: true} // use when deployed remotely
  })
);
ShowRoutes(app);
WishlistRoutes(app);
ReviewRoutes(app);
AuthRoutes(app);
SearchRoutes(app);
UserRoutes(app);
Hello(app);
app.listen(process.env.PORT || 4000);
