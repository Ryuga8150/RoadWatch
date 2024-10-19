export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar?: string; // Optional property
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}
