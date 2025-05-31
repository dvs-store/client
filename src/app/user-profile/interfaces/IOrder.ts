import { Id } from "../../shared/interfaces/api/Id";
import { OrderStatusType } from "../types/OrderStatusType";


export interface IOrder {
    userId:Id;
    id:Id;
    createdAt:Date;
    isActive:boolean;
    updatedAt:Date;
    status:OrderStatusType;
    paymentMethod: string;
    description:string;
    amount:number;
    products:{productId:string; quantity:number;}[];
}

