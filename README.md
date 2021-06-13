# simplified-inventory-management-assistant
A web app for managing inventory

# Project Setup
### Install pipenv on your system
```
pip install pipenv
```
### Install packages (including dev)
```
pipenv install --dev
```
Run this instruction to install the packages (including dev packages) associated with the project

### Install all packages (no dev packages)
```
pipenv install
```
Run this to install all the packages without the dev packages

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

### Run the project
```
flask run
```