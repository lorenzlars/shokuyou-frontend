export function extractParamProp<TParams extends Record<string, string>>(
  params: TParams,
  name: string,
): string | undefined {
  return params[name]
}
