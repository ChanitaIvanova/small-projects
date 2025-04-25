import { SortOrder } from "./SortOrder";

export enum TaskSortField {
    TITLE = "title",
    DESCRIPTION = "description",
    DUE_DATE = "dueDate",
    COMPLETED = "completed",
    TAGS = "tags"
}

export class TaskSort {
    field: TaskSortField;
    order: SortOrder;

    constructor(field: TaskSortField, order: SortOrder) {
        this.field = field;
        this.order = order;
    }
}
