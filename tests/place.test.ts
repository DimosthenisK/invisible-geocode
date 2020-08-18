import dotenv from 'dotenv'
dotenv.config()

import { Place } from '../src/place'
import moment from 'moment-timezone'

describe('Place tests', () => {
  describe('NY Tests', () => {
    let generatedPlace
    beforeAll(async () => {
      generatedPlace = await Place.fromString('New York US')
    })

    test('NY Location', async () => {
      generatedPlace.subscribe((displayableEntry) => {
        expect(displayableEntry.Location).toBe(
          'New York, United States of America (43.1561681 -75.8449946)',
        )
      })
    })

    test('NY Time Information', async () => {
      generatedPlace.subscribe((displayableEntry) => {
        expect(displayableEntry['Time information']).toBe(
          moment.tz('America/New_York').format('DD-MM-YYYY HH:mm:ss'),
        )
      })
    })
    test('NY Weather Information', async () => {
      generatedPlace.subscribe((displayableEntry) => {
        expect(displayableEntry['Weather information']).not.toBeNull()
      })
    })
  })

  describe('Athens Tests', () => {
    let generatedPlace
    beforeAll(async () => {
      generatedPlace = await Place.fromString('Athens Greece')
    })

    test('Athens Location', async () => {
      generatedPlace.subscribe((displayableEntry) => {
        expect(displayableEntry.Location).toBe(
          'Attica, Greece (37.9839412 23.7283052)',
        )
      })
    })

    test('Athens Time Information', async () => {
      generatedPlace.subscribe((displayableEntry) => {
        expect(displayableEntry['Time information']).toBe(
          moment.tz('Europe/Athens').format('DD-MM-YYYY HH:mm:ss'),
        )
      })
    })
    test('Athens Weather Information', async () => {
      generatedPlace.subscribe((displayableEntry) => {
        expect(displayableEntry['Weather information']).not.toBeNull()
      })
    })
  })

  test('Bad location information', async () => {
    let generatedPlace = await Place.fromString('dddddddddd')
    generatedPlace.subscribe((displayableEntry) =>
      expect(displayableEntry['Location']).toBe('dddddddddd Not Found'),
    )
  })
})
