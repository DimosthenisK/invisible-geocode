import { geocoder } from './geocoder'
import { Entry } from 'node-geocoder'
import { from, Observable } from 'rxjs'
import { map, reduce } from 'rxjs/operators'

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
      )
      .subscribe((value) => console.log(value))

    return new Place()
  }

  static async getTimeForPlace(place: Entry) {}

  static async getWeatherForPlace(place: Entry) {}
}
