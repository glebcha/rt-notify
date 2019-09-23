export function getError(error: string | Record<string, string>): {code: number, message: string} {
  let result = { code: 1, message: 'unknown error message' }

  if (typeof error === 'string') {
    result.message = error
  }

  if (typeof error === 'object') {
    result = { ...result, ...error }
  }

  return result
}
