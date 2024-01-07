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

export type DashResponseProps = {
  data: DashboardType;
};
