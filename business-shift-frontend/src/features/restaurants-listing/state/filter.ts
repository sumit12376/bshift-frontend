import { atomWithImmer } from 'jotai-immer';
import type { FetchArgType } from 'openapi-typescript-fetch';

import type { RestaurantListingApi } from '@/features/restaurants-listing/api/restaurent-listing-api';
import { RestaurantSortBy, SortOrder } from '@/shared/types/api/generated';

type QueryParams = Required<FetchArgType<typeof RestaurantListingApi.getRestaurants>>;

export const queryParamsAtom = atomWithImmer<QueryParams>({
  filter: {
    searchQuery: '',
  } ,
  metadata: {
    page: 1,
    size: 3,
    sortBy: RestaurantSortBy.Name,
    sortOrder: SortOrder.Asc,
  },
});
