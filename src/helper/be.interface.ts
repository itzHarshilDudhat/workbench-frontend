export interface Income {
  _id: string;
  name: string;
  amount: number;
  userId: string;
  description: string;
  date: string;
}

export interface Expense {
  _id: string;
  name: string;
  amount: number;
  account: string;
  subAccount: string;
  userId: string;
  description: string;
  date: string;
}
