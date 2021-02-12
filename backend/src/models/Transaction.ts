/**
 * Model for a single expense/revenue transaction
 */

import mongoose, { Schema, Document } from 'mongoose';
import SchemaFields from './Model';
import { AccountDoc } from './Account';

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
  return (
    !!transaction.amount &&
    !!transaction.category &&
    !!transaction.date &&
    !!transaction.title &&
    !!transaction.type
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
