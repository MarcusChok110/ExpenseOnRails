import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// TODO: Fill Schema fields
const ExpenseSchema = new Schema({
  date: { type: Date, required: true },
});

const Expense = mongoose.model('User', ExpenseSchema);

export default Expense;
