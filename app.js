'use strict';

var express = require('express');
var app = express();
var serv = require('http').Server(app);
var io, socket_list, player_list;

init();

function init() {
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/client/index.html');
    });
    app.use('/client', express.static(__dirname + '/client'));
    serv.listen(8080)

    io = require('socket.io')(serv, {});
    socket_list = [];
    player_list = [];
    setEventHandlers();
}

function setEventHandlers() {
    io.sockets.on("connection", onSocketConnection);
}

function onSocketConnection(socket) {
    onSocketConnect(socket);
    socket.on("disconnect", onSocketDisconnect);
}

function onSocketConnect(socket) {
    console.log('Player connected: ' + socket.id);
    socket_list.push(socket);
    listConnectedSockets();
}

function onSocketDisconnect() {
    console.log('Player disconected' + this.id);
    socket_list.splice(socket_list.indexOf(this), 1);
    listConnectedSockets();
}

function listConnectedSockets() {
    console.log('Number of sockets connected: ' + socket_list.length);
    socket_list.forEach(function (socket) {
        console.log(socket.id);
    });
}