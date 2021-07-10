# simplified-inventory-management-assistant
A web app for managing inventory

# Project Setup
### Needed software
* Python 3.8.5
* npm
* VSCode
* Draw.io Integration :VSCode Extension
  
### Install node modules
```
npm install
```
### Install pipenv on your system
```
pip install pipenv
```
### Install packages (including dev)
```
cd sima_web_api
pipenv install --dev
```
Run this instruction to install the packages (including dev packages) associated with the project

### Install all packages (no dev packages)
```
cd sima_web_api
pipenv install
```
Run this to install all the packages without the dev packages

### Create a MySQL database instance
```
CREATE DATABASE database_name;
```

### Add environment variables in the root of the project folder
```
touch .flaskenv .env
```

Add these lines to the .flaskenv file
```
FLASK_APP=run.py
FLASK_ENV=development
FLASK_RUN_PORT=9000
```

Add these lines to the .env file. Replace username, password and database_name with their respective values
```
MYSQL_USERNAME = username
MYSQL_PASSWORD = password
MYSQL_SERVER = localhost
MYSQL_DATABASE_NAME = database_name
SECRET_KEY=generated_key
```

### SECRET_KEY can be generated using
```
import secrets
secrets.token_hex(32)
```

### Perform database migrations
```
cd sima_web_api/
flask db init
flask db stamp head
flask db migrate
flask db upgrade
```

### Start the api
```
npm run api
```

### Start the react web app
```
npm run start
```