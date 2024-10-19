import { IUser } from "./utils/types";

declare namespace Express {
  export interface Request {
    user?: IUser;
  }
  export interface Response {
    user?: IUser;
  }
}
