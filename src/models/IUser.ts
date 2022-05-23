export interface IUser {
  id?: string;
  first_name: string;
  last_name: string;
  password?: string;
  email: string;
}

export interface IIdUser {
  id: string;
}
