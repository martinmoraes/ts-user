export interface IUser {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface IUserPassword extends IUser {
  password: string;
}

export interface IUserUpdate extends IUser {
  password?: string;
}
export interface IIdUser {
  id: string;
}

export interface IAuth {
  email: string;
  password: string;
}

export interface IUserToken {
  user: IUser;
  access_token: string;
}
