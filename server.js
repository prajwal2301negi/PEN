import express from 'express';
import dotenv from 'dotenv';
import { errorMiddleware } from './utils/errorMiddleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

app.use(errorMiddleware);

// Route Files->
import routes from './routes/index.js';
app.use(routes);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log("server is running");
})