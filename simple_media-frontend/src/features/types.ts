export type User = {
  email: string;
  password: string;
  // token: string;
}

type Data = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

export type UserData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  data: Data;
}

export interface AuthState {
  isSuccess: boolean;
  isError: boolean;
  user: UserData | null;
  isLoading: boolean;
  message: string;
  // token: string;
}