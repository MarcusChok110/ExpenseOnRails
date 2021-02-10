import mongoose, { Schema, Document } from 'mongoose';
import SchemaFields from './Model';

interface IUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

const UserSchemaFields: SchemaFields<IUser> = {
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
};

export interface UserDoc extends Document, IUser {}

const UserSchema = new Schema(UserSchemaFields);

const User = mongoose.model<UserDoc>('User', UserSchema);

export default User;
