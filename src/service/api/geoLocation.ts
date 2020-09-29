import api from './index'

export type AddressComponentsData = {
  street: string
  neighborhood: string
  state: string
  city: string
  zipCode: string
  latitude: string
  longitude: string
}

export const geoLocationApi = async ({
  latitude,
  longitude
}: {
  latitude: string
  longitude: string
}): Promise<AddressComponentsData> => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&location_type=ROOFTOP&result_type=street_address&key=AIzaSyBHAXOz2WSqIt4HziGNdnWXjlz2bf03-k4`
    const { data } = await api.get(url)
    const address = data.results[0].address_components
    const street = address[1].long_name
    const neighborhood = address[2].long_name
    const city = address[3].long_name
    const state = address[4].long_name
    const zipCode = address[6].long_name
    const latitudeApi = data.results[0].geometry.location.lat
    const logintudeApi = data.results[0].geometry.location.lng
    return {
      street,
      neighborhood,
      state,
      city,
      zipCode,
      latitude: latitudeApi,
      longitude: logintudeApi
    }
  } catch (error) {
    return {} as AddressComponentsData
  }
}
