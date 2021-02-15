/**
 * Model for user authentication information.
 * Includes email, password, and (optionally), first name and last name.
 */

import mongoose, { Document, Schema } from 'mongoose';
import { AccountDoc } from './Account';
import SchemaFields from './index';

export interface IUser {
  email: string;
  password: string;
  account: AccountDoc | AccountDoc['_id'];
  firstName?: string;
  lastName?: string;
}

const UserSchemaFields: SchemaFields<IUser> = {
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  firstName: { type: String },
  lastName: { type: String },
};

const UserSchema = new Schema(UserSchemaFields);

export interface UserDoc extends Document, IUser {}

const User = mongoose.model<UserDoc>('User', UserSchema);

export default User;
