const BASE_URL = "http://localhost:5000";
const CREATE_USER_URL = BASE_URL + "/user/create"
const GET_ALL_USERS_URL = BASE_URL + "/user"
const DELETE_USER_URL = BASE_URL + "/user"


export type UserType = {
  id: string,
  firstname: string,
  lastname: string,
  email?: string
  coordinates: google.maps.LatLngLiteral
}




export const getUsers = async (start: number = 0, amount:number = 10): Promise<Array<UserType>> => {
  const response = await fetch(GET_ALL_USERS_URL);
  const json = (await response.json()).data;
  return json
}


export const createUser = async () =>{
  const response = await fetch(CREATE_USER_URL);
}

export const deleteUser = async (id: string) =>{
  console.log(id);
  const response = await fetch(`${DELETE_USER_URL}/${id}`, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
  });
  console.log(response.json()); // parses JSON response into native JavaScript objects
}