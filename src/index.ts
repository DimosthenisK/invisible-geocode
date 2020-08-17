import dotenv from 'dotenv'
dotenv.config()
import { Place } from './place'
import yargs from 'yargs'

let main = async () => {
  yargs.argv._[0]
    .split(',')
    .map((place) => place.trim())
    .map(async (place) => await Place.fromString(place))
}

main()
