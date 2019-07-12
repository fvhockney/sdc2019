#! /usr/bin/env bash

npx babel src -d lib && node server/server.js
