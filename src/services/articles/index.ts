import { ArticlesType } from "../../types/articles";
import { connection } from "../connection";

const BASE = "article";

export const controllersArticles = {
  Get: async () => {
    const { data } = await connection.GetData<ArticlesType[]>(BASE);
    return data;
  },
  ById: async (id:string) => {
    const { data } = await connection.GetData<ArticlesType>(`${BASE}/${id}/`);
    return data;
  },
};
