import { fetchClient } from '@/shared/libs/openapi-typescript-fetch/fetch-client';

export const RestaurantListingApi = {
  getRestaurants: fetchClient
    .path('/api/restaurants/list')
    .method('post')
    .create(),
     addNewRestaurant: fetchClient
    .path('/api/restaurants/create')
    .method('post')
    .create(),
    // getRestaurantWithMenus:fetchClient.path('/api/Menu/ListMenu/:id').method('get').create()
}