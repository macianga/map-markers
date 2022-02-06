// file for generic types used in application

export type UserType = {
  id: string,
  firstname: string,
  lastname: string,
  email?: string
  coordinates: google.maps.LatLngLiteral
}