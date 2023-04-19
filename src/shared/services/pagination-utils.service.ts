import { Request } from "express";
import { IPaginatedRequest } from "../models/paginated-request";
import { PaginatedResponse } from "../models/paginated-response";

export class PaginationUtils {
    public static getPaginatedResponse<T>(pageNumber: number, pageSize: number, data: Array<T>): PaginatedResponse<T> {
        return {
            pageNumber,
            pageSize,
            data,
            totalNumberOfRecords: data.length,
            totalNumberOfPages: this.calculateTotalNumberOfPages(data.length, pageSize)
        };
    }

    public static getPagainationRequirmentsFromRequest(req: Request): IPaginatedRequest {
        return {
            pageNumber: parseInt((req.query.pageNumber || process.env.DEFAULT_PAGE_NUMBER) as string),
            pageSize: parseInt((req.query?.pageSize || process.env.DEFAULT_PAGE_SIZE) as string),
        };
    }

    private static calculateTotalNumberOfPages(recordsLength: number, pageSize: number): number {
        const totalNumberOfPages =  recordsLength / pageSize;

        return totalNumberOfPages > 1 ? totalNumberOfPages : 1;
    }
}