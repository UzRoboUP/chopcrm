export type LoginParams = {
  email: string;
  password: string;
};

export type UserData = {
  fullName: string;
  email: string;
  phoneNumber?: string | null;
  roles: string[];
};
