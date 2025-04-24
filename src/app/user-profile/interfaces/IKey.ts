import { Id } from "../../shared/interfaces/api/Id";


export interface IKey {
    userRobloxId:string;
    key: string;
    product?: {
        name:string;
        image:string;
        price:number;
        id:Id;
    };
    userId: string;
    isActive: boolean;
    updatedAt:Date;
    createdAt:Date;
}

