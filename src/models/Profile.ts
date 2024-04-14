export type LoginParams = {
  login: string;
  password: string;
};

export type UserData = {
  fullName: string;
  email: string;
  phoneNumber?: string | null;
  roles: string[];
};
