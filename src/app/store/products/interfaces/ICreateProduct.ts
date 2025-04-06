import { ICategory } from "./ICategory";
import { IStatusProduct } from "./IStatusProduct";


export interface ICreateProduct {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: File;
    catgories:ICategory[];
    status:IStatusProduct;
    images:File[];
}


