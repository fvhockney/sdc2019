#! /usr/bin/env bash

if [ ! -d "node_modules" ]; then
    npm i
fi
npm run build && npx babel -o server.js src/server/server.js && node server.js

