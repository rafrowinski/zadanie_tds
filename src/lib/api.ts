interface BaseApiResponse<T = unknown> {
  meta: {
    code: number
    disclaimer: string
  }
  response: T
}

export const apiFetch = async <T extends BaseApiResponse>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const baseUrl = import.meta.env.VITE_CURRENCY_BEACON_API_URL
  const apiKey = import.meta.env.VITE_CURRENCY_BEACON_API_KEY

  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`

  const headers = new Headers(options.headers)
  if (apiKey) {
    headers.set('Authorization', `Bearer ${apiKey}`)
  }

  const response = await fetch(url, { ...options, headers })

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
