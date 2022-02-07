from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware


def create_app():
    app = FastAPI()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app


api_app = create_app()


@api_app.on_event("startup")
def register_routes():
    from endpoints.user import router
    api_app.include_router(router)

    @api_app.get("/", tags=["Root"])
    async def read_root():
        return {"message": "For more API information go to /docs"}
