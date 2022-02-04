from pydantic import BaseModel, EmailStr, Field


class Coordinates(BaseModel):
    lat: float
    lng: float


class UserModel(BaseModel):
    email: EmailStr = Field(...)
    firstname: str = Field(...)
    lastname: str = Field(...)
    coordinates: Coordinates

    class Config:
        schema_extra = {
            "example": {
                "firstname": "Abdulazeez",
                "lastname": "Adeshina",
                "email": "abdulazeez@x.edu.ng",
            }
        }


def ResponseModel(data, message):
    return {
        "data": data,
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {
        "error": error,
        "code": code,
        "message": message
    }
