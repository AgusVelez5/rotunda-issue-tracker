# Rotunda Issue Tracker

Requeriments:
  - [Docker](https://docs.docker.com/engine/install/)

Clone the repo and fill the [__frontend env variables__](./client/.env.template) and the [__backend env variables__](./api/.env.template).

Run:

```sh
  docker build -t api ./api --no-cache
  docker build -t client ./client --no-cache
  docker run -d -p 3000:3000 api
  docker run -d -p 5173:5173 client
```

Frontend running on port 3000. 
Backend running on port 5173. 

---

Issue labels can be configured in [labels.json](./api/config/labels.json).

Set a default weight in `defaultWeight` and labels in `labels` with the label name as key and its weight as value.

---

Docs on `/api/v1/docs`.