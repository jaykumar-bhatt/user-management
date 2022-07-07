# User Management Task

## Getting Started

You can download this repo or clone using below command. (folder-name will be project folder in which you want to start your project).

```
git clone https://github.com/jaykumar-bhatt/user-management.git
```

or from **Download Zip**

```
https://github.com/jaykumar-bhatt/user-management.git
```

### Project Setup

Once you clone or download project go into you folder

> now copy **.env.local** file to **.env** file

### Installing

```
> npm install
```

some other inportant parameters/keys in **.env** file

```
PORT=3000
URI=mongodb://localhost:27017/databaseName
SECRET=SECRETKEY
```

### Migration and Seeders run

After creating database and updating .env file run below commands

```
cd src/seeders
node dummyUsers.js
```

`npm start` to run your project

> Everythig is setup and you are good to go now. Happy Coding :)

## APIs

> POST `/signin`

```
{
    "username":"jaykumar",
    "name":"Jaykumar Bhatt",
    "email":"jaybhatt1025@gmail.com",
    "password": "12345",
    "age": 22
}
```

> POST `/login`

```
{
    "email":"jaybhatt1025@gmail.com",
    "password": "12345",
}
```

> GET `/user`

> GET `/user/profile`

> POST `/user`

```
{
    "username":"bhargav",
    "name":"Bhargav Dobariya",
    "email":"bhargav@gmail.com",
    "password": "12345",
    "age": 21
}
```

> PUT `/user/:id`

```
{
    "name":"Lav Panchal",
    "username":"Lav",
    "email":"Lavpanchal@gmail.com",
    "age": 22
}
```

> DELETE `/user/:id`

### Success Response

```
{
    "message": "",
    "data": {},
    "success": true,
}
```

### Error Response

```
{
    "errorMessage": "",
    "error": {},
    "success": false,
}
```
