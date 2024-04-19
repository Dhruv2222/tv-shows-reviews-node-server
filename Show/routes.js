import db from "../Database/index.js";
import * as dao from "./dao.js";
export default function ShowRoutes(app) {
  app.get("/api/shows/:showId", async (req, res) => {
    const showId = req.params.showId;
    const show = await dao.findShowByShowId(showId);
    res.send(show);
  });
  app.post("/api/shows", async (req, res) => {
    const show = req.body;
    const existingShow = await dao.findShowByShowId(show.id);
    if (existingShow) {
      return;
    }
    const newShow = dao.createShow(show);
    res.send(newShow);
  });

  
}
