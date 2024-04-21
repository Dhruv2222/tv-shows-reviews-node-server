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
import "dotenv/config";


const app = express();
app.use(express.json());

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};
console.log("Above-", process.env.NODE_ENV);
if (process.env.NODE_ENV !== "development") {
  console.log("non dev env");
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
  };

}
app.use(session(sessionOptions));

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

ShowRoutes(app);
WishlistRoutes(app);
ReviewRoutes(app);
AuthRoutes(app);
SearchRoutes(app);
UserRoutes(app);
Hello(app);

// mongoose.connect("mongodb+srv://Cluster89442:aXF2Zm56TlRE@cluster89442.0fq4prg.mongodb.net/sample-d");
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
mongoose.connect(CONNECTION_STRING);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});


app.listen(process.env.PORT || 4000);