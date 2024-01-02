# Book CRUD API

Simple Book CRUD API. Made with Elysia with Bun runtime.

## Feature

- Registration User
- Login with JWT
- Authentication first for all routes
- Turso for Database
- Easy deploy to fly.io with Docker

## Build and Run

```
docker build -t book-api .
```

```
docker run --env-file .env --name book-api -p 3000:3000 -d book-api
```