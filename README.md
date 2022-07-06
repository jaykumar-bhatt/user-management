
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


### Success Response

```
{
    "code": 200
    "message": "",
    "data": {},
    "success": true,
}
```

### Error Response

```
{
    "code": 500,
    "errorMessage": "",
    "error": {},
    "success": false,
}
```
