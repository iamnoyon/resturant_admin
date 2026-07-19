/**
 * Transforms a paginated API response into ReactTable-ready props.
 *
 * Supports two API response shapes:
 *
 * Shape A (wrapped):
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
 * Shape B (flat with meta):
 * {
 *   success: boolean,
 *   data: Array,
 *   meta: {
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

  // Shape B: data is the array directly, meta holds pagination
  if (Array.isArray(data) && response?.meta) {
    return {
      dataSource: data ?? [],
      totalRecords: response.meta?.total ?? 0,
      pageAndLimit: {
        page: response.meta?.page ?? 1,
        limit: response.meta?.limit ?? 10,
      },
      paginationOn: (response.meta?.total ?? 0) > 0,
    };
  }

  // Shape A: data is an object with content array and pagination fields
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
