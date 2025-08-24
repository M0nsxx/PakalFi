export abstract class BaseOracle {
  protected apiKey: string
  protected baseUrl: string

  constructor(apiKey: string, baseUrl: string) {
    this.apiKey = apiKey
    this.baseUrl = baseUrl
  }

  abstract checkTrigger(
    location: any,
    conditions: any
  ): Promise<{
    triggered: boolean
    data: any
    reason?: string
    severity: 'low' | 'medium' | 'high' | 'extreme'
  }>

  protected async makeRequest(endpoint: string, params: any = {}) {
    const url = new URL(endpoint, this.baseUrl)
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Oracle API error: ${response.status}`)
    }

    return response.json()
  }

  protected validateData(data: any, requiredFields: string[]): boolean {
    return requiredFields.every(field => data.hasOwnProperty(field) && data[field] !== null)
  }

  protected calculateSeverity(score: number): 'low' | 'medium' | 'high' | 'extreme' {
    if (score >= 0.8) return 'extreme'
    if (score >= 0.6) return 'high'
    if (score >= 0.4) return 'medium'
    return 'low'
  }
}

export class WeatherOracle extends BaseOracle {
  constructor() {
    super(process.env.WEATHER_API_KEY!, 'https://api.weather.com/v1')
  }

  async checkTrigger(
    location: { lat: number; lng: number },
    conditions: any
  ): Promise<{
    triggered: boolean
    data: any
    reason?: string
    severity: 'low' | 'medium' | 'high' | 'extreme'
  }> {
    const data = await this.makeRequest(`/location/${location.lat},${location.lng}/weather`)
    
    // Basic implementation - will be overridden by AdvancedWeatherOracle
    return {
      triggered: false,
      data,
      severity: 'low'
    }
  }
}
