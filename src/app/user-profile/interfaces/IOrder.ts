import { Id } from "../../shared/interfaces/api/Id";
import { OrderStatusType } from "../types/OrderStatusType";


export interface IOrder {
    userId:Id;
    status:OrderStatusType;
    paymentMethod: string;
    description:string;
    amount:number;
}

