import useSWRMutation from 'swr/mutation';
import type { SWRKey } from '@/shared/libs/swr/types/common';
import type { UseMutation } from '@/shared/libs/swr/types/use-mutation';

export const useMutation: UseMutation = (key, fetcher, options = {}) => {
  if (typeof fetcher !== 'function') {
    throw new Error('Fetcher must be a function. Did you accidentally call it instead of passing it?');
  }

  const mutateCallback = (
    _: SWRKey,
    { arg }: { arg: Parameters<typeof fetcher>[0] }
  ) => {
    return fetcher(arg);
  };

  const mutateResponse = useSWRMutation(key, mutateCallback, options);

  return { ...mutateResponse };
};
