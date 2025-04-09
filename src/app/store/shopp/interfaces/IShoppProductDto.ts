import { IProductPreview } from "../../products/interfaces/IProductPreview";

export interface IShoppProductDto {
    quantity:number;
    amount:number;
    product:IProductPreview;
    discount?:number;
}
