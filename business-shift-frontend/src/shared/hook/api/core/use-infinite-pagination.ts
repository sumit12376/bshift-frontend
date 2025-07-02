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
    ...rest
  } = useSWRInfinite(
    (index) => {
      if (options.skip ?? !key) return null;

      return [index + 1, ...(Array.isArray(key) ? key : [key])];
    },
    ([page]: [number]) => fetcher(page),
    {
      ...options,
    },
  );

  const loadMore = () => setPage((prev) => prev + 1);

  useEffect(() => {
    const serializedKey = unstable_serialize(key);

    defaultStore.set(infiniteMutatorsAtom, (prev) => ({
      ...prev,
      [serializedKey]: ((params) => {
        const { fromPage, hasNewData } = params ?? {};

        rest.mutate(rest.data, {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const isFirstPage = currentPage === 0;

  const isFirstPageLoading = isFirstPage && rest.isLoading;

  const isPageDataUndefined =
    currentPage > 0 && rest.data?.[currentPage - 1] === undefined;

  const isLoading = rest.isLoading || isFirstPageLoading || isPageDataUndefined;

  return {
    ...rest,
    currentPage,
    loadMore,
    isLoading,
    isFetchingMore: !isFirstPage && (isPageDataUndefined || rest.isLoading),
  };
};














// 'use client';
// import useSWRInfinite from 'swr/infinite';

// export const useInfinitePagination = (key, fetcher, options = {}) => {
//   const {
//     size: currentPage,
//     setSize: setPage,
//     data,
//     error,
//     isLoading,
//     mutate,
//   } = useSWRInfinite(
//     (index) => {
//       if (options.skip ?? !key) return null;
//       return [index + 1, ...(Array.isArray(key) ? key : [key])];
//     },
//     ([page]) => fetcher(page),
//     options
//   );

//   const loadMore = () => setPage((prev) => prev + 1);

//   const isFirstPage = currentPage === 0;
//   const isPageDataMissing = currentPage > 0 && data?.[currentPage - 1] === undefined;

//   return {
//     data,
//     error,
//     mutate,
//     currentPage,
//     loadMore,
//     isLoading: isLoading || (isFirstPage && isLoading) || isPageDataMissing,
//     isFetchingMore: !isFirstPage && (isPageDataMissing || isLoading),
//   };
// };
