import mongoose from 'mongoose';
import { UserInterface } from './interface';

const schema = new mongoose.Schema<UserInterface>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roleType:{type:String,require:true}
});

export const UserModel = mongoose.model('User', schema);
