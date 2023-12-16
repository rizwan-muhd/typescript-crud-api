import express, { Application, NextFunction, Request, Response } from 'express';
// import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import cors from 'cors'

import astrologerRouter from './routes/Astrologer'
// import adminRouter from './routes/admin.js'
// import AppError from './utils/appError.js';
import connectDB from './database/Connection';

dotenv.config({ path: "./.env" });

const server:Application = express();

server.use(cors({ origin: "http://localhost:3000" }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/api', astrologerRouter);
// server.use('/api/admin', adminRouter);



// connecting mongodb
connectDB();

server.listen(process.env.PORT,()=> {
    console.log(`Server listening on Port ${process.env.PORT}`);
})