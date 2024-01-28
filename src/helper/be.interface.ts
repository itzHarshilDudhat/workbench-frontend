export interface Income {
  _id: string;
  amount: number;
  userId: string;
  description: string;
  date: string;
}

export interface Expense {
  _id: string;
  amount: number;
  account: string;
  subAccount: string;
  userId: string;
  description: string;
  date: string;
}

export interface ExpenseGroup {
  _id: string;
  amount: number;
  numOfValues: number;
}
