**About**
An API built using Javascript, Express, Knex and PostgreSQL where you can make calls to multiple endpoints to return information about The Simpsons.

**Live Host**
https://simpsons-api-berbakay.herokuapp.com/api

**Endpoints**
GET /api
GET /api/random_episode
GET /api/episodes
GET /api/episodes/:episode_id
GET /api/characters
GET /api/characters/:character_id

More Detail: https://simpsons-api-berbakay.herokuapp.com/api

**How To Run Remotely**

* Clone this repo

```
$ git clone https://github.com/berbakay/simpsons_data
```

* Install node packages:

```
$ npm install
```

* Create the database:

```
$ npm run setup-dbs
```

* Insert data into the database:

```
$ npm run seed
```

* Start the server:

```
$ npm start
```

**Scripts**

```
$ npm start ---> starts the server on PORT 9090
$ npm test ---> run the test suite
$ npm run migrate-make my-new-table-name ---> create a new migration table
$ npm run migrate-latest ---> go to the latest migration
$ npm run migrate-rollback ---> go to the first migration

```