import cors from "cors";
import express from 'express';
import Hello from "./Test.js";
const app = express();
app.use(cors());
app.use(express.json());
Hello(app);
app.listen(process.env.PORT || 4000);