import { UserType, LoginType } from "../../types/users/auth";
import { connection } from "../connection";

const BASE = "sessions";

export const controllersAuth = {
  Login: async (value: LoginType) => {
    const { data } = await connection.PostData<UserType, LoginType>(
      `${BASE}`,
      value
    );
    return data;
  },
};
