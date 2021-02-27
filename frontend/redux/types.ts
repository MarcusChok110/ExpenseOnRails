// Interfaces for state format

export interface User {
  loggedIn: boolean;
  email: string;
  account: string;
  firstName?: string;
  lastName?: string;
  _id: string;
}

export interface Account {
  categories: string[];
  balance: number;
  budget: number;
  expenses: number;
}

export interface Transaction {
  amount: number;
  category: string;
  date: string;
  description: string;
  title: string;
  type: 'expense' | 'revenue';
  _id: string;
}
