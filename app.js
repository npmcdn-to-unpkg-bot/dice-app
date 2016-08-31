'use strict';

var express = require('express');
var app = express();
var serv = require('http').Server(app);
var Game = require('./server/game').Game;
var Player = require('./server/player').Player;
var io, socket_list, player_list, game;

init();

function init() {
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/client/index.html');
    });
    app.use('/client', express.static(__dirname + '/client'));
    app.use('/client/js', express.static(__dirname + '/client/js'));
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
    socket.on("disconnect", onSocketDisconnect);
    socket.on("new player", onNewPlayer);
    socket.on("set number of dices", onSetNumberOfDices);
}

function onSocketDisconnect() {
    console.log('Player disconected' + this.id);
    removeFromGameLists(this);
    this.broadcast.emit("remove player", this.id);
}

function onNewPlayer() {
    console.log('New player connected: ' + this.id);
    //TODO: change logic here to send the current game info to new player, also update others of new player
    if (game.numberOfDices == 0) {
        this.emit('set number of dices');
    }
    addToGameLists(this);
    this.broadcast.emit("new player", {id: this.id});
}

function onSetNumberOfDices(data) {
    console.log('dice number being set to: ' + data.number);
    if (data.number >= 1 && data.number <= 4 && game.numberOfDices == 0) {
        game.numberOfDices = data.number;
    }
    this.broadcast.emit("number of dices", {number: game.numberOfDices});
}

function addToGameLists(socket) {
    socket_list.push(socket);
    player_list.push(new Player(socket.id));
}

function removeFromGameLists(socket) {
    socket_list.splice(socket_list.indexOf(socket), 1);
    for (var i = 0; i < player_list.length; i++) {
        if (player_list[i].id == socket.id) {
            player_list.splice(i, 1);
            break;
        }
    }
}

function listGameLists() {
    // for debugging reasons
    console.log('Number of players connected: ' + player_list.length);
    player_list.forEach(function (player) {
        console.log(player.id);
    });

    console.log('Number of sockets: ' + socket_list.length);
    socket_list.forEach(function (socket) {
        console.log(socket.id);
    });
}