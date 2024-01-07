import { connection } from "../connection";
import { PublishedType } from "../../types/components/dashboard";
import { PurchasedType } from "../../types/components/purchased";

const BASE = "dashboard";

export const controllersArticles = {
  Published: async () => {
    const { data } = await connection.GetData<PublishedType>(
      `${BASE}/published`
    );
    return data;
  },
  Purchased: async () => {
    const { data } = await connection.GetData<PurchasedType>(
      `${BASE}/purchased`
    );
    return data;
  },
};
