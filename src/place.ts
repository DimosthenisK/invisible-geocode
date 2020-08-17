import { geocoder } from './geocoder'
import { Entry } from 'node-geocoder'
import { from, Observable } from 'rxjs'
import { map, reduce } from 'rxjs/operators'
import { weather, weatherInfo } from './weatherApi'
import moment, { Moment } from 'moment-timezone'
import geoTz from 'geo-tz'

export class Place {
  constructor() {}
  static async fromString(place: string): Promise<Place> {
    let possibilities: Observable<Entry> = from(await geocoder.geocode(place))
    possibilities
      .pipe(
        reduce((highestConfidenceEntry: Entry, currentEntry: Entry) => {
          if (!highestConfidenceEntry) return currentEntry
          return currentEntry?.extra?.confidence <
            highestConfidenceEntry?.extra?.confidence
            ? currentEntry
            : highestConfidenceEntry
        }),
        map(async (entry: Entry) => ({
          ...entry,
          weatherInformation: await Place.getWeatherForPlace(entry),
          timeInformation: await Place.getTimeForPlace(entry),
        })),
      )
      .subscribe(async (value) => console.log(await value))

    return new Place()
  }

  static async getTimeForPlace(place: Entry) {
    let timezone = geoTz(place.latitude, place.longitude)[0]
    if (!timezone) return null
    let timezonedMoment = moment.tz(timezone)

    let parseMoment = (moment: Moment) => ({
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
