import { Model } from "mongoose";

export interface UserFields {
  username: string;
  password: string;
  token: string;
  __confirmPassword: string;
  displayName: string;
  phoneNumber: number,
}

export interface UserVirtuals {
  confirmPassword: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods, UserVirtuals>;
