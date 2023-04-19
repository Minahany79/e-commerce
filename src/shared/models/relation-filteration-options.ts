import { IFindPaginatedOptions } from "./find-paginated-options";
import { IRelationProperties } from "./relation";

export interface IRelationFilterationOptions extends IFindPaginatedOptions {
    queryBuilderCreationPropertyName: string;
    tableRelations: IRelationProperties[];
    relationFilteration: string[];
}