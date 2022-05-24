export interface IUser {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface IUserPassword extends IUser {
  password: string;
}

export interface IIdUser {
  id: string;
}
