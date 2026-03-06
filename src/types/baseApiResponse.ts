export interface BaseApiResponse<T = unknown> {
  meta: {
    code: number
    disclaimer: string
  }
  response: T
}
