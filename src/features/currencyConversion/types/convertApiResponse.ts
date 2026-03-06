import type { BaseApiResponse } from '@/types/baseApiResponse.ts'

export interface ConvertApiResponse extends BaseApiResponse {
  response: {
    timestamp: number
    date: string
    from: string
    to: string
    amount: number
    value: number
  }
}
