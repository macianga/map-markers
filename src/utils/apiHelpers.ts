import {apiResponseType, request} from "./request";
import {UserType} from "./types";

const BASE_URL = import.meta.env.VITE_API_HOST
const CREATE_USER_URL = BASE_URL + "/users/create"
const GET_ALL_USERS_URL = BASE_URL + "/users"
const DELETE_USER_URL = BASE_URL + "/users"


export const getUsers = async (): Promise<apiResponseType<Array<UserType>>> => {
  return await request<Array<UserType>>(GET_ALL_USERS_URL);
}

export const createUser = async () =>{
  return await request<UserType>(CREATE_USER_URL);
}

export const deleteUser = async (id: string) =>{
  return await request<UserType>(DELETE_USER_URL, "DELETE", new URLSearchParams({user_id: id}));
}