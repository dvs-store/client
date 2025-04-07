import { IShoppProductDto } from "./IShoppProductDto";


export interface IShoppCartDto {
    products:IShoppProductDto[];
    userId:string;
    id:string;
    total:number;
}

