import {UserType} from "./apiHelpers";


export const getUserWithId = (id: string, users: Array<UserType>): UserType => {
  const index = users.findIndex((user)=>{
    return user.id === id;
  })
  return users[index];
}