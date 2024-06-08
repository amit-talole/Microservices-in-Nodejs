/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiResponseType } from 'src/common/response-promise';
import { ResponseMassages, ResponseStatus, Message } from '../../common/constant';
import { ProductServices } from './productService';

class Product {
  constructor(
    private readonly productServices: ProductServices,
    private readonly responseStatus: ResponseStatus,
  ) {}
  addProduct = async (data: any, userId: number): Promise<apiResponseType> => {
    console.log('userId', userId);

    try {
      return await this.productServices.addProductAsync({ ...data, userId });
    } catch (error: any) {
      return { status: this.responseStatus.error, message: error.message };
    }
  };

  getProductById = async (data: any): Promise<apiResponseType> => {
    try {
      return await this.productServices.getProductByIdAsync(data);
    } catch (error: any) {
      return { status: this.responseStatus.error, message: error.message };
    }
  };
}

export const product = new Product(
  new ProductServices(new ResponseMassages(), new Message(), new ResponseStatus()),
  new ResponseStatus(),
);
