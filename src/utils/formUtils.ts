import { AxiosError, type AxiosResponse } from 'axios'

/**
 * Filters out the specified keys from an object and returns a new object with the remaining key-value pairs.
 */
export function preprocessValues<T extends Record<string, unknown>, K extends (keyof T)[]>(
  values: T,
  excludeKeys: K,
): Omit<T, K[number]> {
  return Object.entries(values)
    .filter(([key]) => !excludeKeys.includes(key as keyof T))
    .reduce(
      (acc, [key, value]) => {
        ;(acc as T)[key as keyof T] = value as T[keyof T]

        return acc
      },
      {} as Omit<T, K[number]>,
    )
}

/**
 * Extracts and returns the data payload from an Axios response.
 */
export function unwrapResponseData<T>(response: AxiosResponse<T> | AxiosError): T {
  if (response instanceof AxiosError) {
    throw response
  }

  return response.data
}
