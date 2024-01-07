import { connection } from "../connection";

const BASE = "sale";

export const controllersSales = {
  Sales: async (IdProduct: { ids_product: string[] }) => {
    const { data } = await connection.PostData<any, { ids_product: string[] }>(
      `${BASE}/`,
      IdProduct
    );
    return data;
  },
};
