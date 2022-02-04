from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware


def create_app():
    app = FastAPI()
    # app.add_event_handler("shutdown", close_db)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app


app = create_app()


@app.on_event("startup")
def register_routes():
    from endpoints.user import router
    app.include_router(router)

    @app.get("/", tags=["Root"])
    async def read_root():
        return {"message": "For more API information go to /docs"}
