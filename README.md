<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">An API to manage the books of a library.</p>

## Description
This API is going to implement a CRUD to manage books and login to users. A user will be able to register, login and manage books.

This project is done using Hexagonal Architecture and DDD patterns.
It has some examples of Acceptance and unit tests. We use here the mother pattern to mock and generate the necessary data.

## Installation
First, you need to clone de repopistory from github:
```bash
$ git clone git@github.com:Frzurita/library-backend.git
```

Then, you need to install all the dependencies:

```bash
$ npm install
```
The app is going to use two different databases, one to persist the data of the app and the other to execute the acceptance tests.

To install them, you can use the `docker-compose.yaml` ubicated in the root path. It is going to install them right on the way executing the following command in the same folder of the docker-compose file:

```bash
$ docker-compose up -d
```
**Tip:** You'll need to have docker installed.

The databases used in this `docker-compose.yaml` will work with the configuration defined in the `env.example` file. You will be able to use the app to create a new `.env` file in the root using the same config.

Finally, you will need to either, change the `DB_SYNC` in the `.env` file or execute the following command:
```bash
$ npm run typeorm:all-db-sync
```
It will sync the databases with the current TypeORM entities.

once you have all this set, you will be able to run the app.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
**Tip:** You will need to build the project before you run the app in prod:
```bash
# build
$ npm run build
```

## Test

```bash
# unit tests
$ npm run test:unit

# acceptance tests
$ npm run test:features

# test coverage
$ npm run test:cov
```
**Tip:** To run the acceptance tests, you will need to have the testing database up.


## Demo
Here is the [Demo](https://library.ippai-games.com/api)


## License

Nest is [MIT licensed](LICENSE).
