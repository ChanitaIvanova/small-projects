export class Pagination {
    limit: number = 10;
    offset: number = 0;

    constructor(limit: number, offset: number) {
        this.limit = limit;
        this.offset = offset;
    }
}
