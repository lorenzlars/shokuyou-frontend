/**
 * Extracts the value of the route params. This is used for proper typing.
 */
export function extractParamProp<TParams extends Record<string, string>>(
  params: TParams,
  name: string,
): string | undefined {
  return params[name]
}
