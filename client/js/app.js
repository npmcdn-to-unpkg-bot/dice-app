var socket;

function init() {
    socket = io();
    setEventHandlers();
}

function setEventHandlers() {
    socket.on("connect", onSocketConnected);
    socket.on("set number of dices", onSetNumberOfDices);
    socket.on("number of dices", onNumberOfDices);
    socket.on("update game info", onUpdateGameInfo);
}

function onSocketConnected() {
    console.log("Connected to socket server");
    socket.emit("new player", {});
}

function onSetNumberOfDices() {
    // Todo: show some dialog for picking number of dices 1 - 4. React and redux stuff here
    console.log('set number of game dices');
    socket.emit("set number of dices", {number: 2});
}

function onNumberOfDices(data) {
    console.log('number of dices from server: ' + data.number);
}

function onUpdateGameInfo(data){
    console.log('game info update: ' + data.players);
    // ReactDOM.render(
    //     <GameInfo />, // problems with visibility here, somehow doesn't see react_components
    //     document.getElementById('game-info')
    // );
}

init();