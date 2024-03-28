import cors from "cors";
import express from 'express';
import Hello from "./Test.js";
import session from 'express-session'
import AuthRoutes from "./Auth/routes.js";
import UserRoutes from "./Users/routes.js";

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true // Allow cookies and HTTP authentication to be sent
  }));
app.use(express.json());
app.use(
    session({
        secret: "pizza is best",
        // cookie: {secure: true} // use when deployed remotely
    })
)
AuthRoutes(app);
UserRoutes(app);
Hello(app);
app.listen(process.env.PORT || 4000);