var Game = function(){
    this.numberOfDices = 0;
    this.state = 'paused';
};

Game.prototype.rollOneDice = function() {
    return Math.floor(Math.random() * 6) + 1;
};

Game.prototype.rollDices = function() {
    var totalSum = 0;
    for (var i = 0; i < this.numberOfDices; i++) {
        totalSum += this.rollOneDice();
    }
    return totalSum;
};

exports.Game = Game