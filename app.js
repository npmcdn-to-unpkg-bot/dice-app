'use strict';

var express = require('express');
var app = express();
var serv = require('http').Server(app);
var Game = require("./server/game").Game;
var Player = require("./server/player").Player;
var io, socket_list, player_list, game;

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
    game = new Game();
    setEventHandlers();
}

function setEventHandlers() {
    io.sockets.on("connection", onSocketConnection);
}

function onSocketConnection(socket) {
    onSocketConnect(socket);
    socket.on("disconnect", onSocketDisconnect);
    socket.on("diceNumberSet", onDiceNumberSet);
}

function onSocketConnect(socket) {
    console.log('Player connected: ' + socket.id);
    //TODO: move handling of number of dices to a function
    if (game.numberOfDices == 0) {
        socket.emit('setNumberOfDices');
    }
    //TODO: move list handling to a function
    socket_list.push(socket);
    player_list.push(new Player(socket.id));
    socket.broadcast.emit("updated player list", player_list);
    listConnectedPlayers();
}

function onSocketDisconnect() {
    console.log('Player disconected' + this.id);
    socket_list.splice(socket_list.indexOf(this), 1);
    //TODO: remove player from the list properly
    player_list.splice(player_list.indexOf(this.id), 1);
    listConnectedPlayers();
}

function onDiceNumberSet(data) {
    console.log('dice number being set');
    //TODO: validation for setting 1-4 only
    game.numberOfDices = data.numberOfDices;
}

function listConnectedPlayers() {
    console.log('Number of sockets connected: ' + player_list.length);
    player_list.forEach(function (player) {
        console.log(player.id);
    });
}