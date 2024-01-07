export type UserType = {
  token: string;
  user: {
    email: string;
    name: string;
    avatar: string;
  };
};

export type LoginType = {
  email: string;
  password: string;
};
