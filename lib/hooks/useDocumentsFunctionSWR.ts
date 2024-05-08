import useSWR, { SWRConfiguration } from "swr";

/**
 * Custom `useSWR` hook that takes server actions from `/lib/actions`
 *
 * @example
 * const { data, error, mutate } = useDocumentsFunctionSWR(
 *   getDocumentUsers,
 *   { documentId },
 *   { refreshInterval: 0 }
 * );
 *
 * @template T The type of the server action function
 * @template R The type of the return value of the server action function
 * @param documentAction A server action function
 * @param documentActionArgs The arguments to pass to the server action function
 * @param swrOptions SWR configuration
 */
export function useDocumentsFunctionSWR<T extends (...args: any) => Promise<{ data: any }>, R = Awaited<ReturnType<T>>["data"]>(
  documentAction: T,
  documentActionArgs: Parameters<T>,
  swrOptions: SWRConfiguration = {}
) {
  const fetcher = async (...args: [...Parameters<T>, SWRConfiguration?]): Promise<R> => {
    const [action, ...actionArgs] = args;

    const { data, error } = await action(...actionArgs);

    if (error) {
      console.error(error.message);
      throw error;
    }

    return data;
  };

  return useSWR<R>([documentAction, ...documentActionArgs], fetcher, swrOptions);
}
