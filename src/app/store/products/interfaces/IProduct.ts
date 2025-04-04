import { ICategory } from "./ICategory";
import { IStatusProduct } from "./IStatusProduct";


export interface IProduct {
    name:string;
    stock:number;
    createdAt:Date;
    updatedAt:Date;
    description:string;
    price:number;
    image:string;
    images:string[];
    categories:ICategory[];
    status:IStatusProduct;
    isActive:Boolean;
}

