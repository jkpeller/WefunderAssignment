#!/bin/bash

echo "Starting the backend..."
npm start &
cd client
echo "Starting the frontend..."
yarn start