import axios from 'axios'
import { ethers } from 'ethers'
import { WeatherOracle } from './base'

export class AdvancedWeatherOracle extends WeatherOracle {
  private conaguaApiKey: string
  private openWeatherApiKey: string
  private weatherApiKey: string
  private activeSubscriptions: Map<string, any> = new Map()

  constructor() {
    super()
    this.conaguaApiKey = process.env.CONAGUA_API_KEY!
    this.openWeatherApiKey = process.env.OPENWEATHER_API_KEY!
    this.weatherApiKey = process.env.WEATHER_API_KEY!
  }

  async checkWeatherTrigger(
    location: { lat: number; lng: number; city?: string },
    conditions: {
      temperatureThreshold?: number
      rainfallThreshold?: number
      windSpeedThreshold?: number
      humidityThreshold?: number
      pressureThreshold?: number
    }
  ): Promise<{
    triggered: boolean
    data: any
    reason?: string
    severity: 'low' | 'medium' | 'high' | 'extreme'
  }> {
    // Fetch data from multiple sources for redundancy
    const [conaguaData, openWeatherData] = await Promise.all([
      this.fetchCONAGUAData(location),
      this.fetchOpenWeatherData(location)
      // this.fetchWeatherData(location)
    ])

    // Cross-validate data
    const validatedData = this.crossValidateWeatherData(
      conaguaData,
      openWeatherData
    )

    // Check parametric triggers
    const triggers = this.checkAllTriggers(validatedData, conditions)
    
    return {
      triggered: triggers.length > 0,
      data: validatedData,
      reason: triggers.join(', '),
      severity: this.calculateAdvancedSeverity(triggers, validatedData)
    }
  }

  private async fetchCONAGUAData(location: { lat: number; lng: number; city?: string }) {
    try {
      const response = await axios.get(
        `https://smn.conagua.gob.mx/webservices/index.php?method=1&cd_estacion=${this.getNearestStation(location)}`,
        {
          headers: {
            'Authorization': `Bearer ${this.conaguaApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      )
      return this.parseCONAGUAResponse(response.data)
    } catch (error) {
      console.error('CONAGUA API error:', error)
      return null
    }
  }

  private async fetchOpenWeatherData(location: { lat: number; lng: number }) {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=${this.openWeatherApiKey}&units=metric`
      )
      return this.parseOpenWeatherResponse(response.data)
    } catch (error) {
      console.error('OpenWeather API error:', error)
      return null
    }
  }

  private crossValidateWeatherData(...dataSources: any[]) {
    const validSources = dataSources.filter(source => source !== null)
    
    if (validSources.length === 0) {
      throw new Error('No weather data available')
    }

    // Calculate weighted average based on source reliability
    const weights = { conagua: 0.5, openweather: 0.3, weather: 0.2 }
    
    return {
      temperature: this.calculateWeightedAverage(validSources, 'temperature', weights),
      rainfall: this.calculateWeightedAverage(validSources, 'rainfall', weights),
      windSpeed: this.calculateWeightedAverage(validSources, 'windSpeed', weights),
      humidity: this.calculateWeightedAverage(validSources, 'humidity', weights),
      pressure: this.calculateWeightedAverage(validSources, 'pressure', weights),
      timestamp: new Date().toISOString()
    }
  }

  private checkAllTriggers(data: any, conditions: any): string[] {
    const triggers: string[] = []

    if (conditions.temperatureThreshold && data.temperature > conditions.temperatureThreshold) {
      triggers.push(`Temperatura crítica: ${data.temperature}°C`)
    }

    if (conditions.rainfallThreshold && data.rainfall > conditions.rainfallThreshold) {
      triggers.push(`Lluvia intensa: ${data.rainfall}mm`)
    }

    if (conditions.windSpeedThreshold && data.windSpeed > conditions.windSpeedThreshold) {
      triggers.push(`Vientos fuertes: ${data.windSpeed} km/h`)
    }

    if (conditions.humidityThreshold && data.humidity > conditions.humidityThreshold) {
      triggers.push(`Humedad extrema: ${data.humidity}%`)
    }

    return triggers
  }

  private calculateAdvancedSeverity(triggers: string[], data: any): 'low' | 'medium' | 'high' | 'extreme' {
    if (triggers.length === 0) return 'low'
    
    const severityScores = {
      temperature: data.temperature > 45 ? 4 : data.temperature > 40 ? 3 : data.temperature > 35 ? 2 : 1,
      rainfall: data.rainfall > 200 ? 4 : data.rainfall > 150 ? 3 : data.rainfall > 100 ? 2 : 1,
      windSpeed: data.windSpeed > 120 ? 4 : data.windSpeed > 100 ? 3 : data.windSpeed > 80 ? 2 : 1
    }

    const maxScore = Math.max(...Object.values(severityScores))
    
    if (maxScore >= 4) return 'extreme'
    if (maxScore >= 3) return 'high'
    if (maxScore >= 2) return 'medium'
    return 'low'
  }

  async subscribeToAlerts(
    location: string,
    callback: (alert: any) => void,
    policyId: string
  ) {
    const subscription = {
      location,
      callback,
      policyId,
      lastCheck: Date.now(),
      active: true
    }

    this.activeSubscriptions.set(policyId, subscription)

    // Start real-time monitoring
    this.startRealTimeMonitoring(policyId)
  }

  private async startRealTimeMonitoring(policyId: string) {
    const subscription = this.activeSubscriptions.get(policyId)
    if (!subscription) return

    const interval = setInterval(async () => {
      if (!subscription.active) {
        clearInterval(interval)
        return
      }

      try {
        const result = await this.checkWeatherTrigger(
          { lat: 0, lng: 0, city: subscription.location },
          {
            temperatureThreshold: 40,
            rainfallThreshold: 100,
            windSpeedThreshold: 80
          }
        )

        if (result.triggered) {
          subscription.callback({
            policyId,
            trigger: result,
            timestamp: new Date().toISOString()
          })
        }

        subscription.lastCheck = Date.now()
      } catch (error) {
        console.error(`Weather monitoring error for policy ${policyId}:`, error)
      }
    }, 300000) // Check every 5 minutes

    // Store interval reference for cleanup
    subscription.interval = interval
  }

  async unsubscribeFromAlerts(policyId: string) {
    const subscription = this.activeSubscriptions.get(policyId)
    if (subscription) {
      subscription.active = false
      if (subscription.interval) {
        clearInterval(subscription.interval)
      }
      this.activeSubscriptions.delete(policyId)
    }
  }

  private getNearestStation(location: { lat: number; lng: number; city?: string }): string {
    // CONAGUA station mapping for major Mexican cities
    const stations: Record<string, string> = {
      'cdmx': '090150',
      'guadalajara': '141250',
      'monterrey': '190380',
      'puebla': '211450',
      'merida': '310050',
      'tijuana': '020010'
    }

    return stations[location.city || 'cdmx'] || '090150'
  }

  private parseCONAGUAResponse(data: any) {
    return {
      temperature: parseFloat(data.temperatura) || 0,
      rainfall: parseFloat(data.precipitacion) || 0,
      windSpeed: parseFloat(data.velocidad_viento) || 0,
      humidity: parseFloat(data.humedad) || 0,
      pressure: parseFloat(data.presion) || 0
    }
  }

  private parseOpenWeatherResponse(data: any) {
    return {
      temperature: data.main.temp,
      rainfall: data.rain?.['1h'] || 0,
      windSpeed: data.wind.speed * 3.6, // Convert m/s to km/h
      humidity: data.main.humidity,
      pressure: data.main.pressure
    }
  }

  private calculateWeightedAverage(sources: any[], field: string, weights: any): number {
    let total = 0
    let totalWeight = 0

    sources.forEach((source, index) => {
      const weight = Number(Object.values(weights)[index]) || 0.1
      total += (source[field] || 0) * weight
      totalWeight += weight
    })

    return totalWeight > 0 ? total / totalWeight : 0
  }
}
