# [FFHS CAS Full-Stack Development](https://www.ffhs.ch/en/degree-programmes/continuing-education/cas-full-stack-development)

Repository von:

STUD: IxxI5

## Words Wide Web

This web application enables users to identify the trend of word/s from news on a specific given date (past or present) or range of dates across the World Wide Web. Furthermore, it may provide to the users, storing of the findings on a server along with a graphical represantion.

## Prerequisites

- Python is installed
- Node is installed
- Register for API Key. Go to Link: https://newsapi.org/register

## Installation

**Server**

- Open a **Command Prompt** Terminal (VS Code, WebStorm, etc.)
- Clone the project
- Rename the opened Terminal as "server"
- Go to the "project" directory

  ```
  cd server/project
  ```

- Create an .env file

  ```
  type nul > .env
  ```

- Open the created .env file and insert the following. In place of stars, enter the API Key (see Prerequisites):

  ```
  API_KEY=********************************
  ```

- Go back to the "server" directory

  ```
  cd..
  ```

- Create and activate a virtual environment (venv)

  ```
  python -m venv venv

  cd venv/scripts

  .\activate

  cd ..\..\
  ```

- Install the requirements

  ```
  pip install -r requirements.txt
  ```

- Create the database (skip this step if the db.sqlite3 file is available)

  ```
  python manage.py makemigrations

  python manage.py migrate
  ```

- Run the server
  ```
  python manage.py runserver 127.0.0.1:8000
  ```

The server application (Django REST Web API) is now running at http://127.0.0.1:8000.

Now we have to install and run the client application (React App).

**Client**

- Open a new **Command Prompt** Terminal (VS Code, WebStrom, etc.)

- Rename the opened Terminal as "client"

- Go to "client" directory

  ```
  cd client
  ```

- Install the dependencies

  ```
  npm install
  ```

- Run the client
  ```
  npm start
  ```

The client application (React App) is now running at http://127.0.0.1:3000.

Now the full stack app (server and client) is running and the user may start to interact with it through the UI. Use the following stored (db.sqlite3) user credentials to explore the app's features:

```
username: test
password: test1234
```

**Django Web API Endpoints**

URL: http://127.0.0.1:8000/api/schema/swagger-ui/

## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

Copyright (c) 2015 Chris Kibble

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
