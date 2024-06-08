export class ProductDto {
  name: string | undefined;
  type: string | undefined;
  quantity: number | undefined;
  userId: string|undefined;
}

export class GetProductByIdDto {
  id: string | undefined;
}
