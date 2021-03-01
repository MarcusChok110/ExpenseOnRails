/**
 * Model for a single expense/revenue transaction
 */

import mongoose, { Document, Schema } from 'mongoose';
import { AccountDoc } from './Account';
import SchemaFields from './index';

export interface ITransaction {
  account: AccountDoc['_id'] | AccountDoc;
  amount: number;
  category: string;
  date: Date;
  description?: string;
  title: string;
  type: 'expense' | 'revenue';
}

/**
 * Validates all fields except account (added later) and description (optional)
 */
export const validateFields = (transaction: ITransaction): boolean => {
  const isNullish = (value: any) => value === null || value === undefined;
  const { amount, category, date, title, type } = transaction;
  return (
    !isNullish(amount) &&
    !isNullish(category) &&
    !isNullish(date) &&
    !isNullish(title) &&
    !isNullish(type)
  );
};

const TransactionSchemaFields: SchemaFields<ITransaction> = {
  account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  title: { type: String, required: true },
  type: { type: String, required: true, enum: ['expense', 'revenue'] },
};

const TransactionSchema = new Schema(TransactionSchemaFields);

export interface TransactionDoc extends Document, ITransaction {}

const Transaction = mongoose.model<TransactionDoc>(
  'Transaction',
  TransactionSchema
);

export default Transaction;
