import { atomWithImmer } from 'jotai-immer';
import type { FetchArgType } from 'openapi-typescript-fetch';

import type { RestaurantListingApi } from '@/features/restaurants-listing/api/restaurent-listing-api';
import { EmployeeSortBy, SortOrder } from '@/shared/types/api/generated';

type QueryParams = Required<FetchArgType<typeof RestaurantListingApi.getRestaurants>>;

export const queryParamsAtoms = atomWithImmer<QueryParams>({
  filter: {
    searchQuery: '',
  } ,
  metadata: {
    page: 1,
    size: 3,
    sortBy: EmployeeSortBy.Name,
    sortOrder: SortOrder.Asc,
  },
});
