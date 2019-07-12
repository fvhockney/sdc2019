#! /usr/bin/env bash

if [ ! -d "node_modules" ]; then
    npm i
fi
npm run build && npm run serve
