import { Document } from 'mongoose';

export interface ICategory {
    name: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}
