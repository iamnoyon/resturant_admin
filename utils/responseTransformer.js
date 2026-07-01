/**
 * Transforms a paginated API response into ReactTable-ready props.
 *
 * Expects API shape:
 * {
 *   success: boolean,
 *   data: {
 *     content: Array,
 *     total: number,
 *     page: number,
 *     limit: number,
 *     totalPages: number
 *   }
 * }
 *
 * Returns:
 * {
 *   dataSource: Array,
 *   totalRecords: number,
 *   pageAndLimit: { page: number, limit: number },
 *   paginationOn: boolean
 * }
 */
export const transformListResponse = (response) => {
  const data = response?.data;

  return {
    dataSource: data?.content ?? [],
    totalRecords: data?.total ?? 0,
    pageAndLimit: {
      page: data?.page ?? 1,
      limit: data?.limit ?? 10,
    },
    paginationOn: (data?.total ?? 0) > 0,
  };
};
