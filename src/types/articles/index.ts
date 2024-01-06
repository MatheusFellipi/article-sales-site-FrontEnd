type UsersType = {
  name: string;
  job_role: string;
  avatar: string;
};

export type ArticlesType = {
  id: string;
  title: string;
  themes: string[];
  img_url: string;
  created_at: Date;
  amount: number;
  user: UsersType;
  userIsPurchased?: boolean;
  text?: any;
};

export interface ArticlesProps {
  article: ArticlesType[];
}
