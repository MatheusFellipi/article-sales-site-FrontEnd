export type PurchasedType = {
  purchased: [
    {
      id: string;
      title: string;
      user_id: string;
      amount: number;
      themes: string[];
      img_url: string;
      created_at: Date;
      update_at: Date;
      user: {
        id: string;
        name: string;
        job_role: string;
        avatar: string;
      };
    }
  ];
  count: number;
  themes: [
    {
      themes: string;
      total: number;
    }
  ];
};