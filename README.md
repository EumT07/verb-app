## Master English Verbs (Currently working on this project)

Is an interactive web application that allows users to practice, learn and improve the pronunciation of English verbs in order to increase their vocabulary and improve their learning.

## Technology Stack

* Nest.js
* Typescript
* Prisma ORM
* Postgresql
* Integration with:
    * Deepseek AI

## DataBase Desing

I have used [dbdiagram](https://dbdiagram.io/) to perform the Entity:Relationship data modeling, allowing me to visualize how I could structure the database relationships, to keep the schema basic and simple.

<p align="center">
  <img src="https://github.com/EumT07/verb-app/blob/master/src/public/images/DataBase_structure.png"  width="650" height="400" alt="DB" />
</p>

## Swagger

With swagger you can visualize how the endpoints are distributed.

<p align="center">
  <img src="https://github.com/EumT07/verb-app/blob/master/src/public/images/swagger.png" width="650" height="400"  alt="swagger" />
</p>

## Project setup
### Prerequisites
* Node.js(v18 or higher)
* npm or yarn

## Installation

1. Clone the repository:

```bash
https://github.com/EumT07/verb-app.git
cd verb-app
```
2. Install dependencies

```bash
npm install
```
3. Set up environment variables

```bash
# Create a File .env
# Edit the following variables
PORT=4545 "Your favorite port"
DATABASE_URL="postgresql://username:randompassword@localhost:5432/mydb?schema=public"
JWT_SECRET="secret-token"
JWT_RECOVERY_PASSWORD_SECRET="recovery-token"
```
## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
