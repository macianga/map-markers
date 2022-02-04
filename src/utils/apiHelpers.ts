type UserType = {
  id: string,
  firstname: string,
  lastname: string,
  email?: string
  coordinates: google.maps.LatLngLiteral
}

export const getUsers = (start: number = 0, amount:number = 10): Array<UserType> => {
  return [
    {id: "id1", firstname: "mark", lastname: "rob", coordinates:{lat: 65.5654, lng: 134.6322}},
    {id: "id2", firstname: "mar2", lastname: "rob2", coordinates:{lat: 45.5654, lng: 94.6322}},
    {id: "id3", firstname: "mar3", lastname: "rob3", coordinates:{lat: 15.5654, lng: 154.6322}},
    {id: "id4", firstname: "POLSKA", lastname: "rob3", coordinates:{lat: 52.8772, lng: 19.2245}},
  ]
}

