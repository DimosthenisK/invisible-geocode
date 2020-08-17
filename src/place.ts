import { geocoder } from './geocoder'
import { Entry } from 'node-geocoder'
import { from, Observable } from 'rxjs'
import { map, reduce } from 'rxjs/operators'
import { weather, weatherInfo } from './weatherApi'
import moment, { Moment } from 'moment-timezone'
import geoTz from 'geo-tz'

interface timeInformation {
  timezone: string
  date: {
    year: number
    month: number
    day: number
  }
  time: {
    hours: number
    minutes: number
  }
  formatted: string
}

export class Place {
  constructor() {}
  static async fromString(place: string): Promise<void> {
    const possibilities: Observable<Entry> = from(await geocoder.geocode(place))
    const getHighestPossibility = (
      highestConfidenceEntry: Entry,
      currentEntry: Entry,
    ) => {
      if (!highestConfidenceEntry) return currentEntry
      return currentEntry?.extra?.confidence <
        highestConfidenceEntry?.extra?.confidence
        ? currentEntry
        : highestConfidenceEntry
    }
    const getWeatherAndTimeInformation = async (
      entry: Entry,
    ): Promise<
      Entry & { timeInformation: timeInformation } & {
        weatherInformation: weatherInfo | null
      }
    > => ({
      ...entry,
      weatherInformation: await Place.getWeatherForPlace(entry),
      timeInformation: await Place.getTimeForPlace(entry),
    })
    const formatToObject = async (
      entry: Promise<
        Entry & { timeInformation: timeInformation } & {
          weatherInformation: weatherInfo | null
        }
      >,
    ) => {
      let finalObject = await entry
      console.log(finalObject)
      return {
        Location: `${finalObject.state}, ${finalObject.country} (${finalObject.latitude} ${finalObject.longitude})`,
        'Time information': finalObject.timeInformation.formatted,
        'Weather information': `${finalObject.weatherInformation.weather[0].description}, ${finalObject.weatherInformation.main.temp} degrees (${finalObject.weatherInformation.main.temp_max} max / ${finalObject.weatherInformation.main.temp_min} min)`,
      }
    }
    possibilities
      .pipe(
        reduce(getHighestPossibility),
        map(getWeatherAndTimeInformation),
        map(formatToObject),
      )
      .subscribe(async (value) => console.table(await value))
  }

  static async getTimeForPlace(place: Entry): Promise<timeInformation> {
    let timezone = geoTz(place.latitude, place.longitude)[0]
    if (!timezone) return null
    let timezonedMoment = moment.tz(timezone)

    let parseMoment = (moment: Moment): timeInformation => ({
      timezone: moment.tz(),
      date: {
        year: moment.year(),
        month: moment.month() + 1,
        day: moment.date(),
      },
      time: {
        hours: moment.hour(),
        minutes: moment.minute(),
      },
      formatted: moment.format('DD-MM-YYYY HH:mm:ss'),
    })
    return parseMoment(timezonedMoment)
  }

  static getWeatherForPlace(place: Entry): Promise<null | weatherInfo> {
    return new Promise((resolve, reject) => {
      weather.setCoordinate(place.latitude, place.longitude)
      weather.getAllWeather<weatherInfo>(function (err, weatherResult) {
        if (err) reject(null)
        else resolve(weatherResult)
      })
    })
  }
}
