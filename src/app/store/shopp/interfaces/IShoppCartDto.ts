import { IProductPreview } from "../../products/interfaces/IProductPreview";


export interface IShoppCartDto {
    products:IProductPreview[];
    userId:string;
    id:string;
}

