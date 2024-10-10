import express, { NextFunction, Request, Response } from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRoute";
import globalErrorHandler from "./controllers/errorController";

const app = express();
app.set("trust-proxy", true);

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

// const pathNew = path.join(__dirname, "..", "/client/dist");
// console.log(__dirname, pathNew);
// app.use(express.static(path.join(__dirname, "..", "/client/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
// });

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server`) as any;
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

app.use(globalErrorHandler);

export default app;
