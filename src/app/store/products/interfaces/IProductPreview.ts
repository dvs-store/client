import { Id } from "../../../shared/interfaces/api/Id";
import { IStatusProduct } from "./IStatusProduct";



export interface IProductPreview {
    id: Id;
    name:string;
    description:string;
    image:string;
    status:IStatusProduct;
    isActive:Boolean;
}
