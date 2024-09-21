export interface RegisterMutation {
  username: string;
  password: string;
  confirmPassword: string;
  phoneNumber: number;
  displauName: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  phoneNumber: number;
  displauName: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

