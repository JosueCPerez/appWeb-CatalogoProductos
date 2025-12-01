export class CreateProductDto {
  name: string;
  price: number;
  stock: number;
  catalogIds: string[]; 
  description?: string;
  image?: string;
}


export class UpdateProductDto {
  name?: string;
  price?: number;
  stock?: number;
  catalogIds?: string[];
  description?: string;
  image?: string;
}
