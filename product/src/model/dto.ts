export interface ProductDto {
  name: string;
  type: string;
  quantity: number;
  userId: string;
}

export interface GetProductByIdDto {
  id: string;
}
