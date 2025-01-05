import { AxiosError, type AxiosResponse } from 'axios'
import { toTypedSchema } from '@vee-validate/yup'
import { inject, provide } from 'vue'
import type { AnyObject, ObjectSchema } from 'yup'
import { string } from 'yup'

export type Schema = {
  fields: {
    [key: string]: {
      spec: {
        label: string
      }
    }
  }
}

export const schemaContextKey = Symbol()

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

export function toProvidedTypedSchema(
  ...props: Parameters<typeof toTypedSchema>
): ReturnType<typeof toTypedSchema> {
  provide(schemaContextKey, props[0])

  return toTypedSchema(props[0], props[1] ?? { stripUnknown: true, abortEarly: false })
}

export function injectSchema() {
  const schema = inject<Schema>(schemaContextKey)

  if (!schema) {
    throw new Error('Schema for not provided. Make sure to use toProvidedTypedSchema().')
  }

  return schema
}
