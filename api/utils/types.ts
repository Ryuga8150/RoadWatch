export interface IUser extends Document {
  id: string;
  username: string;
  email: string;
  password: string | undefined;
  avatar?: string; // Optional property
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}

export interface UserRequest extends Request {
  user?: IUser;
}
