type TotalsType = {
  themes: "Purchased articles";
  total: number;
};

export type DashboardType = {
  totals: TotalsType[];
  bestSales: [
    {
      title: string;
      amount: number;
    }
  ];
  options: any;
};

export type DashResponseProps = {
  data: DashboardType;
};
