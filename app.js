'use strict';

const express = require('express');
const receive = require('./messages/receive');
const bodyParser = require('body-parser');
const firebase = require('./firebase/firebase');

firebase.initializeApp();

var app = express();

app.use(express.static('loader-io'));

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/message', receive.receivedMessage);

app.listen(app.get('port'), function () {
    console.log('Node app listening on port ', app.get('port'));
});