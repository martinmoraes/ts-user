#!/bin/bash

docker run -d --rm -p 27017:27017 --name mongodb \
  -v /home/martin/develop/ts-express/data:/data/db \
	-e MONGO_INITDB_ROOT_USERNAME=ts_express \
	-e MONGO_INITDB_ROOT_PASSWORD=ts_express \
mongo
