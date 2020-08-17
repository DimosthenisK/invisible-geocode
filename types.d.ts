declare module 'openweather-apis' {
  namespace weather {
    function setCoordinate(lat: number, long: number): void
    function setAPPID(key: string): void
    function getAllWeather<T>(callback: (err: string, result: T) => void)
  }

  export = weather
}

declare module 'geo-tz' {
  function geoTz(lat: number, long: number): string[]
  export = geoTz
}
