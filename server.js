import express from 'express';
import pkg from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors'
import bodyParser from "body-parser";
import path from "path";
import dbConfig from "./db.config/index.js"
import { fileURLToPath } from "url";
import setCorsHeaders from './middleware/corsMiddleware.js';
import userRoute from './routes/user.routes.js';
import manageVideoRoute from './routes/manageVideo.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 5001;
const { json } = pkg;
dotenv.config();
app.use(express.json());
app.use(setCorsHeaders);
app.use(bodyParser.urlencoded({ extended: true, limit: 0 }));
app.use(bodyParser.json({ limit: 0 }));
app.use(express.static(path.join(__dirname, "uploads")));
app.use(json());
app.use('/users', userRoute);
app.use('/videos', manageVideoRoute);
const corsOptions = {
  origin: '*',
};
app.use(cors());
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
