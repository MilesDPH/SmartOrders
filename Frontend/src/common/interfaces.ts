export interface CursorPagination<T> {
    data: T[],
    path: string,
    per_page: number,
    next_cursor: string|null,
    prev_cursor: string|null,
    prev_page_url: string|null
}