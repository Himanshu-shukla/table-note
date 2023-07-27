// package references
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// app references
const notesRouter = require('./notes-router');

// initialization
const PORT = process.env.PORT || 8000;

// configure server

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());
server.use(morgan('combined'));
server.use('/api', notesRouter(PORT));


// start server at given PORT

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT} ...`);
});