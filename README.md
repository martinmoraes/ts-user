# ília - Code Challenge NodeJS

## Setup

- Install docker
- Configure .env - Ref.: .ENV
- Run the following commands:

```
$ git clone https://github.com/martinmoraes/ts-user
$ cd ts-user
$ chmod +x docker/entrypoint.sh
$ docker-compose up
```

## APIs

All APIs are under port 3001

#### POST /users

**Payload**

```
{
	"first_name":"João",
	"last_name":"Silva",
	"password":"123456",
	"email": "joao@asdfg.br"
}
```

#### GET /users

Returns all users

#### PATCH /users/<user_id>

Alter user a given user_id
**Payload**

```
{
	"first_name":"Paulo b",
	"last_name":"Silva",
	"password":"123456",
	"email": "joao@asdfg.br"
}
```

#### GET /users/<user_id>

List user a given user_id

#### DELETE /users/<user_id>

Delete user a given user_id

#### POST /auth

Authenticate user
**Payload**

```
{
	"password":"123456",
	"email": "joao@asdfg.br"
}
```

## .ENV

#Servidor back-end
PORT=3333

#MongoDB
MONGOCONNECT=mongodb://user:user@host.docker.internal:27018/admin

DATABASE=users

#JWT
PRIVATEKEY=ILIACHALLENGE
EXPIRES_IN=90h
