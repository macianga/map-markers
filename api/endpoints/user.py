from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from database.database import *
from models.users import *

router = APIRouter(
    prefix="/user",
    tags=["users"],
)


@router.get("/", response_description="Users retrieved")
async def get_users():
    users = await retrieve_users()
    return ResponseModel(users, "Users data retrieved successfully") \
        if len(users) > 0 \
        else ResponseModel(
        users, "Empty list returned")


@router.get("/{id}", response_description="User data retrieved")
async def get_user_data(user_id):
    user = await retrieve_user(user_id)
    return ResponseModel(user, "User data retrieved successfully") \
        if user \
        else ErrorResponseModel("An error occurred.", 404, "Users doesn't exist.")


@router.post("/", response_description="User data added into the database")
async def add_user_data(user: UserModel = Body(...)):
    user = jsonable_encoder(user)
    new_user = await add_user(user)
    return ResponseModel(new_user, "User added successfully.")


@router.delete("/{id}", response_description="User data deleted from the database")
async def delete_user_data(user_id: str):
    deleted_user = await delete_user(user_id)
    return ResponseModel("User with ID: {} removed".format(user_id), "User deleted successfully") \
        if deleted_user \
        else ErrorResponseModel("An error occurred", 404, "User with id {0} doesn't exist".format(id))

# @router.put("{id}")
# async def update_user(id: str, req: UpdateStudentModel = Body(...)):
#     updated_student = await update_user_data(id, req.dict())
#     return ResponseModel("Student with ID: {} name update is successful".format(id),
#                          "Student name updated successfully") \
#         if updated_student \
#         else ErrorResponseModel("An error occurred", 404, "There was an error updating the student.".format(id))
