import os

RANDOM_USER_SERVICE_URL = os.environ.get("RANDOM_USER_SERVICE_URL", "https://randomuser.me/api/")
ALLOW_ORIGINS = os.environ.get("ALLOW_ORIGINS", "http://localhost:3000")

# MONGO_PASSWORD = os.environ.get("MONGO_PASSWORD", "dev_password")
# # MONGO_USER = os.environ.get("MONGO_PASSWORD", "dev_password")
# # MONGO_DATABASE = os.environ.get("MONGO_PASSWORD", "dev_password")
# # MONGO_URL = os.environ.get("MONGO_PASSWORD", "localhost:27017")

MONGO_CONNECTION_URL = os.environ.get("MONGO_CONNECTION_URL", "")
