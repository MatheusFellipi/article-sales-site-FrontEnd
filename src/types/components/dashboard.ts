export type TotalsType = {
  themes: string;
  total: number;
};

export type TypeBestSellers = {
  id: string;
  title: string;
  totalAmount: number;
  totalBuys: number;
};

export type TypeChartsLine = {
  labels: string[];
  values: number[];
};

export type DashboardType = {
  totals: TotalsType[];
  bestSales: TypeBestSellers[];
  options: TypeChartsLine;
};

export type PublishedType = {
  listArticle: [
    {
      id: string;
      title: string;
      user_id: string;
      amount: number;
      themes: string[];
      img_url: null;
      created_at: Date;
      update_at: Date;
    }
  ];
  themes: [
    {
      themes: string;
      total: number;
    }
  ];
};

export type DashResponseProps = {
  data: DashboardType;
};
