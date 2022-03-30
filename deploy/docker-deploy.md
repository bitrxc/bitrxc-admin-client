# How to deploy this client with docker

Open shell(bash or sh), make sure current working directory is at root of this repo, usually named as `bitrxc-admin-client`. Then execute commands below to deploy product server:
```bash
docker --env-file ./deploy/environment/.env down
docker --env-file ./deploy/environment/.env up --detach --build
```

Or run with another environment variable file to launch another instance of this docker image.