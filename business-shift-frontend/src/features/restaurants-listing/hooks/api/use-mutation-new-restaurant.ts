
import { useMutation } from '@/shared/hook/api/core/use-mutation';
// import { useRevalidate } from '@shared/hooks/api/core/use-revalidate';
import { RestaurantListingApi } from '../../api/restaurent-listing-api';
// import { queryParamsAtom } from '../../state/filter';
import { API_CACHE_KEY } from '@/shared/components/constants/api-cache-key';
import { defaultStore } from '@/shared/libs/jotai/default-store';
import { openNewRestaurantModalAtom } from '../../state/modals-drawers';

export const useMutationRestaurant = () => {
//   const queryParams = useAtomValue(queryParamsAtom);
//   const { revalidateInfinitePage } = useRevalidate();

  return useMutation(
    API_CACHE_KEY.ADD_NEW_RESTAURANT,
    RestaurantListingApi.addNewRestaurant,
    {
      onSuccess: (response) => {
        // Define the expected type for response.data
        type ResponseData = {
          success: boolean;
          message?: string;
          data: { id?: string };
        };

        const data = response.data as ResponseData;

        if (!data.success) {
          return data.message;
        } else if (!data.data.id) {
          return;
        }
        // revalidateInfinitePage(
        //   [API_CACHE_KEY.GET_RESTAURANT_LIST, queryParams],
        //   { hasNewData: true }
        // );

        defaultStore.set(openNewRestaurantModalAtom, false);
      },
    }
  );
};
