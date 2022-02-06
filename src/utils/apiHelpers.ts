const BASE_URL = "http://localhost:5000"
const CREATE_USER_URL = BASE_URL + "/users/create"
const GET_ALL_USERS_URL = BASE_URL + "/users"
const DELETE_USER_URL = BASE_URL + "/users"


export type UserType = {
  id: string,
  firstname: string,
  lastname: string,
  email?: string
  coordinates: google.maps.LatLngLiteral
}

type jsonResponseWithErrorType<Type> = {
  response: Type,
  error: string,
}

type apiResponseType<ResponseSchema> = [responseOk: boolean, resp: jsonResponseWithErrorType<ResponseSchema>]

const getResponseError = async (request: Response,
                                defaultErrorMessage = "An error has occurred"): Promise<string> => {
  try {
    return (await request.json()).message
  } catch (e) {
    return defaultErrorMessage;
  }
}

const getJson = async <SchemaType>(response: Response): Promise<SchemaType> => {
  // The server may return null or malformed json
  try {
    return await response.json()
  } catch {
    return <SchemaType>{}
  }
}

export const request = async <JSONSchema>(url: string, method: string = "GET", url_params?: URLSearchParams): Promise<apiResponseType<JSONSchema>> => {
  const url_obj = new URL(url);

  url_obj.search = url_params ? url_params.toString() : "";

  const response = await fetch(url_obj.toString(), {
    method: method,
  });

  if (response.status === 200 && response.ok) {
    const json = await getJson<{code: number, data: JSONSchema, message: string}>(response);
    return [response.ok, {response: json.data, error: ""}]
  }

  const error = await getResponseError(response)
  return [response.ok, {response: <JSONSchema>{}, error: error}]
}

export const getUsers = async (): Promise<apiResponseType<Array<UserType>>> => {
  return await request<Array<UserType>>(GET_ALL_USERS_URL);
}

export const createUser = async () =>{
  return await request<UserType>(CREATE_USER_URL);
}

export const deleteUser = async (id: string) =>{
  return await request<UserType>(DELETE_USER_URL, "DELETE", new URLSearchParams({user_id: id}));
}