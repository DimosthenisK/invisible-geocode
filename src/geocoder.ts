import NodeGeocoder from 'node-geocoder'

export const geocoder = NodeGeocoder({
  provider: 'opencage',
  apiKey: process.env['GEO_API_KEY'],
})
