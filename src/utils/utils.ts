import {UserType} from "./types";

export const findUserWithId = (id: string, users: Array<UserType>): UserType => {
  const index = users.findIndex((user)=>{
    return user.id === id;
  })
  return users[index];
}