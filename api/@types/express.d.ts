// src/@types/express.d.ts
import { Request } from "express";

declare module "express" {
  export interface Request {
    user?: any; // Use a more specific type if available
  }
}
