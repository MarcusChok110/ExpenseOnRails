/**
 * Model for user authentication information.
 * Includes email, password, and (optionally), first name and last name.
 */

import mongoose, { Schema, Document } from 'mongoose';
import SchemaFields from './Model';
import { AccountDoc } from './Account';

interface IUser {
  email: string;
  password: string;
  account: AccountDoc['_id'] | AccountDoc;
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
