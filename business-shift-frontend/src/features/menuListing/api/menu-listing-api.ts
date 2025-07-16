import { fetchClient } from "@/shared/libs/openapi-typescript-fetch/fetch-client";

export const MenuListingApi  = {
  getMenu: fetchClient
    .path('/api/Menu/ListMenu/{id}')
    .method('get')
    .create(),
     addMenu: fetchClient
    .path('/api/Menu/createMenu')
    .method('post')
    .create(),
}