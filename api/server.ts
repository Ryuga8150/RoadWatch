import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// relative to main folder
dotenv.config({ path: "./config.env" });

// console.log(process.env);
const DB = process.env.DATABASE?.replace(
  "<DATABASE_PASSWORD>",
  process.env.DATABASE_PASSWORD as string
);

mongoose
  .connect(DB as string)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const server = app.listen(3000, () => {
  console.log("Server is listening at Port 3000");
});

// LAST SAFETY NET
// every error gets carried on process.on which could be used if not handled

// this is for async code
process.on("unhandledRejection", (err: Error) => {
  console.log("Unhandled Rejection! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
