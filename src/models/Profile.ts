export type LoginParams = {
  username: string;
  password: string;
};

export type UserData = {
  fullName: string;
  email: string;
  phoneNumber?: string | null;
  roles: string[];
};
