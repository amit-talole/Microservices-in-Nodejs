/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductModel } from '../../model/product.model';
import { GetProductByIdDto, ProductDto } from '../../model/dto';
import { ResponseMassages, Message, ResponseStatus } from '../../common/constant';
import { apiResponseType } from '../../common/response-promise';

export class ProductServices {
  constructor(
    private readonly responseMassages: ResponseMassages,
    private readonly message: Message,
    private readonly responseStatus: ResponseStatus,
  ) {}

  addProductAsync = async (data: ProductDto): Promise<apiResponseType> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      console.log('data', data);

      const { type, name, quantity, userId } = data;
      if (!type || !name || !userId || !quantity) {
        return { status: this.responseStatus.fail, message: this.message.invalidParameter };
      }

      const result = await new ProductModel({
        name: name,
        type: type,
        quantity: quantity,
        userId: userId,
      }).save();
      if (result?._id) {
        return {
          status: this.responseStatus.success,
          message: this.responseMassages.success,
          data: result,
        };
      }
      return { status: this.responseStatus.fail, message: this.responseMassages.bad_request };
    } catch (error: any) {
      return { status: this.responseStatus.error, message: error.message };
    }
  };

  async getProductByIdAsync(data: GetProductByIdDto): Promise<apiResponseType> {
    try {
      const { id } = data;
      if (!id) {
        return { status: this.responseStatus.fail, message: this.message.invalidParameter };
      }
      const result = await ProductModel.findOne({ _id: id });
      if (result?._id) {
        return {
          status: this.responseStatus.success,
          message: this.responseMassages.success,
          data: result,
        };
      }

      return { status: this.responseStatus.fail, message: this.responseMassages.bad_request };
    } catch (error: any) {
      return { status: this.responseStatus.error, message: error.message };
    }
  }
}
