'use client'
import { useEffect } from 'react';
import { unstable_serialize } from 'swr';
import useSWRInfinite from 'swr/infinite';

import { defaultStore } from '@/shared/libs/jotai/default-store';
import type { UseInfinitePagination } from '@/shared/libs/swr/types/use-infinite-pagination';
import type { InfiniteMutator } from '@/shared/states/swr';
import { infiniteMutatorsAtom } from '@/shared/states/swr';

export const useInfinitePagination: UseInfinitePagination = (
  key,
  fetcher,
  options = {},
) => {
  const {
    size: currentPage,
    setSize: setPage,
    data,
    error,
    isValidating,
    mutate,
  } = useSWRInfinite(
    (index) => {
      if (options.skip ?? !key) return null;
      return [index + 1, ...(Array.isArray(key) ? key : [key])];
    },
    ([page]: [number]) => fetcher(page),
    {
      ...options,
      revalidateFirstPage: false,
    },
  );

  const loadMore = () => setPage((prev) => prev + 1);

  useEffect(() => {
    const serializedKey = unstable_serialize(key);

    defaultStore.set(infiniteMutatorsAtom, (prev) => ({
      ...prev,
      [serializedKey]: ((params) => {
        const { fromPage, hasNewData } = params ?? {};

        mutate(undefined, {
          revalidate: (_, swrKey) => {
            const [pageNumber] = swrKey as [number];
            return !fromPage || fromPage <= pageNumber;
          },
        });

        if (hasNewData) {
          loadMore();
        }
      }) as InfiniteMutator,
    }));

    return () => {
      defaultStore.set(infiniteMutatorsAtom, (prev) => {
        const restMutators = Object.fromEntries(
          Object.entries(prev).filter(([k]) => k !== serializedKey)
        );
        return restMutators;
      });
    };
  }, [key, mutate]);

  // Calculate if we've reached the end of data
  const totalLoaded = data?.reduce((sum, page) => sum + (page?.data?.data?.nodes?.length || 0), 0) || 0;
  const totalDocs = data?.[0]?.data?.data?.metadata?.totaldocs || 0;
  const hasMore = totalLoaded < totalDocs;

  // const isLoadingInitialData = !data && !error;
  // const isLoadingMore = 
  //   isValidating && 
  //   data && 
  //   typeof data[currentPage - 1] === 'undefined';

  return {
    data,
    error,
    mutate,
    currentPage,
    loadMore,
    // isLoading: isLoadingInitialData,
    // isFetchingMore: isLoadingMore,
    hasMore,
    totalLoaded,
    totalDocs,
  };
};



// const data = [
//   { // Page 1
//     data: {          // Axios wrapper
//       data: {        // Your API response
//         nodes: [/* 3 employees */],
//         metadata: { page: 1, size: 3, totaldocs: 6 }
//       }
//     }
//   },
//   { // Page 2
//     data: {
//       data: {
//         nodes: [/* 3 more employees */],
//         metadata: { page: 2, size: 3, totaldocs: 6 }
//       }
//     }
//   }
// ]









