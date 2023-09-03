export type PaginationResponse<T> = {
  meta: {
    page: number;
    size: number;
    total: number;
    totalPage: number;
  };
  data: T;
};
