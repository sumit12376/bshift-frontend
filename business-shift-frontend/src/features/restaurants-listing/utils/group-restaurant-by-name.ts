import dayjs from 'dayjs';

import { queryParamsAtom } from '../state/filter';
import { defaultStore } from '@/shared/libs/jotai/default-store';
import type { ApiType } from '@/shared/types/utils/api';

type RestaurantGroup = Record<string, ApiType['RestaurantNode'][] | null>;

export const groupRestaurantBySortType = (
  restaurants: ApiType['RestaurantNode'][],
): RestaurantGroup => {
  const queryParams = defaultStore.get(queryParamsAtom);

  const sortType = queryParams.metadata.sortBy;

  switch (sortType) {
    case 'createdAt': {
      const groupedRestaurants = restaurants.reduce<RestaurantGroup>((acc, restaurant) => {
        const date = dayjs(restaurant.createdAt).format('MMMM D');

        const existingRestaurants = acc[date];

        if (existingRestaurants) {
          existingRestaurants.push(restaurant);
        } else {
          acc[date] = [restaurant];
        }

        return acc;
      }, {});

      return groupedRestaurants;
    }

    case 'restaurantName': {
      const groupedRestaurants = restaurants?.reduce<RestaurantGroup>((acc, restaurant) => {
        const { restaurantName } = restaurant;

        // Check if restaurantName exists and starts with a letter from A to Z
        if (restaurantName) {
          const firstLetter = restaurantName[0].toUpperCase();

          if (firstLetter >= 'A' && firstLetter <= 'Z') {
            // Ensure acc[firstLetter] is an array before pushing
            if (!acc[firstLetter]) {
              acc[firstLetter] = []; // Initialize if not already an array
            }

            acc[firstLetter]!.push(restaurant); // The '!' asserts that acc[firstLetter] is not null here
          }
        }

        return acc;
      }, {});

      const sortedGroupedRestaurants = Object.keys(groupedRestaurants)
        .sort() // Sort keys alphabetically
        .reduce<RestaurantGroup>((sortedAcc, key) => {
          sortedAcc[key] = groupedRestaurants[key];

          return sortedAcc;
        }, {});
// console.log('sortedGroupedRestaurants:', sortedGroupedRestaurants);
      return sortedGroupedRestaurants;
    }

    default: {
      return {};
    }
  }
};
