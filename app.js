'use strict';

var express = require('express');
var app = express();
var serv = require('http').Server(app);
var Game = require('./server/game').Game;
var Player = require('./server/player').Player;
var io, socketList, game;

init();

function init() {
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/client/index.html');
    });
    app.use('/client', express.static(__dirname + '/client'));
    app.use('/client/js', express.static(__dirname + '/client/js'));
    serv.listen(8080)

    io = require('socket.io')(serv, {});
    socketList = [];
    game = new Game();
    setEventHandlers();
}

function setEventHandlers() {
    io.sockets.on("connection", onSocketConnection);
}

function onSocketConnection(socket) {
    socket.on("disconnect", onSocketDisconnect);
    socket.on("new player", onNewPlayer);
    // socket.on("set number of dices", onSetNumberOfDices);
}

function onSocketDisconnect() {
    console.log('Player disconected' + this.id);
    removeFromGameInfo(this);
    updateClientsGameInfo(this);
}

function onNewPlayer() {
    console.log('New player connected: ' + this.id);
    // if (game.numberOfDices == 0) {
    //     this.emit('set number of dices');
    // }
    addToGameInfo(this);
    updateClientsGameInfo();
}

function updateClientsGameInfo() {
    for (var i = 0; i < socketList.length; i++) {
        socketList[i].emit("update game info", game);
    }
}

function onSetNumberOfDices(data) {
    console.log('dice number being set to: ' + data.number);
    if (data.number >= 1 && data.number <= 4 && game.numberOfDices == 0) {
        game.numberOfDices = data.number;
    }
    this.broadcast.emit("number of dices", {number: game.numberOfDices});
}

function addToGameInfo(socket) {
    socketList.push(socket);
    game.players.push(new Player(socket.id));
}

function removeFromGameInfo(socket) {
    socketList.splice(socketList.indexOf(socket), 1);
    for (var i = 0; i < game.players.length; i++) {
        if (game.players[i].id == socket.id) {
            game.players.splice(i, 1);
            break;
        }
    }
}

function listGameLists() {
    // for debugging reasons
    console.log('Number of players connected: ' + game.players.length);
    game.players.forEach(function (player) {
        console.log(player.id);
    });

    console.log('Number of sockets: ' + socketList.length);
    socketList.forEach(function (socket) {
        console.log(socket.id);
    });
}