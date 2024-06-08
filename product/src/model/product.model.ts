import mongoose from 'mongoose';
import { ProductInterface } from './interface';

const schema = new mongoose.Schema<ProductInterface>({
  name: { type: String, required: true },
  type: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true, default: 0 },
  userId: { type: String, require: true },
});

export const ProductModel = mongoose.model('Product', schema);
