# CHESS API [![Build Status](https://www.travis-ci.org/Entilore/chess-api.svg?branch=master)](https://www.travis-ci.org/Entilore/chess-api)
[![Code Climate](https://codeclimate.com/github/Entilore/chess-api/badges/gpa.svg)](https://codeclimate.com/github/Entilore/chess-api) [![Test Coverage](https://codeclimate.com/github/Entilore/chess-api/badges/coverage.svg)](https://codeclimate.com/github/Entilore/chess-api)

This projects aims to provide an API for online chess game. It is based on socket communication, using Node.js, Socket.io and MongoDB.

## Project Status

The model is in development, no interface provided yet. Not usable. 

## Features

- Create a game
- check is movement is allowed for some pieces (pawn)

## Install 

You have to install first node js and npm. Then, at the root of the project, run: 

``` npm install ```

To launch the server, run:

``` npm start ```

*nodemon* can also be used, with the command ```nodemon app.js```

To launch the tests, run: 

``` npm test ```