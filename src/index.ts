import dotenv from 'dotenv'
dotenv.config()
import { Place } from './place'
import yargs from 'yargs'
import { from, Observable } from 'rxjs'
import { map, reduce } from 'rxjs/operators'

let main = async () => {
  from(yargs.argv._[0].split(','))
    .pipe(
      map((place: string) => place.trim()),
      map(async (place: string) => await Place.fromString(place)),
    )
    .subscribe(async (displayableEntryObservable) =>
      (await displayableEntryObservable).subscribe((displayableEntry) =>
        console.table(displayableEntry),
      ),
    )
}

main()
