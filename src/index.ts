import { Place } from './place'
import yargs from 'yargs'
;(async () => {
  yargs.argv._[0]
    .split(',')
    .map((place) => place.trim())
    .map((place) => Place.fromString(place))
})()
