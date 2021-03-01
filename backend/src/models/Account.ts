/**
 * Account model for user data.
 * Contains fields such as transactions and expenses.
 */
import mongoose, { Document, Schema } from 'mongoose';
import SchemaFields from './index';
import { TransactionDoc } from './Transaction';
import { UserDoc } from './User';

export interface IAccount {
  categories: string[];
  balance: number;
  budget: number;
  expenses: number;
  transactions: TransactionDoc['_id'][] | TransactionDoc[];
  user: UserDoc['_id'] | UserDoc;
}

/**
 * Default categories for Account category field
 */
const defaultCategories = [
  'Clothing',
  'Entertainment',
  'Food',
  'Health',
  'Housing',
  'Income',
  'Insurance',
  'Miscellaneous',
  'Transportation',
  'Utilities',
];

const AccountSchemaFields: SchemaFields<IAccount> = {
  categories: { type: [String], required: true, default: defaultCategories },
  balance: { type: Number, required: true, default: 0 },
  budget: { type: Number, required: true, default: 0 },
  expenses: { type: Number, required: true, default: 0 },
  transactions: [
    { type: Schema.Types.ObjectId, ref: 'Transaction', required: true },
  ],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
};

const AccountSchema = new Schema(AccountSchemaFields);

export interface AccountDoc extends Document, IAccount {}

const Account = mongoose.model<AccountDoc>('Account', AccountSchema);

export default Account;
