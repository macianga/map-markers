export $(echo $(cat .env | sed 's/#.*//g' | sed 's/\r//g' | xargs) | envsubst)
source env/bin/activate
export PYTHON_PATH=.
python api/main.py