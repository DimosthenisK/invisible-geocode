import weatherApi from 'openweather-apis'

weatherApi.setAPPID(process.env['WEATHER_API_KEY'])
weatherApi.setLang(process.env['LANG'])
weatherApi.setUnits(process.env['UNITS'] as any)

export interface weatherInfo {
  coord: { lon: number; lat: number }
  sys: { country: string; sunrise: number; sunset: number }
  weather: [{ id: number; main: string; description: string; icon: string }]
  main: {
    temp: number
    humidity: number
    pressure: number
    temp_min: number
    temp_max: number
  }
  wind: { speed: number; deg: number }
  rain: { '3h': number }
  clouds: { all: number }
  dt: number
  id: number
  name: string
  cod: number
}

export const weather = weatherApi
