#!/bin/bash

if [[ $ISDEV == "1" ]]; then
  cd /app && npm i -g nodemon && nodemon dist/index.js
else
  cd /app && npm run prod
fi