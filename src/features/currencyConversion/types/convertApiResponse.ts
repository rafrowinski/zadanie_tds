export interface ConvertApiResponse {
  meta: { code: number; disclaimer: string }
  response: {
    timestamp: number
    date: string
    from: string
    to: string
    amount: number
    value: number
  }
}
