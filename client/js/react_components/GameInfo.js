var GameInfo = React.createClass({
    render: function() {
        return (
            <div>
                <GeneralGameInfo diceCount={2} playerCount={3} />
                {/*<PlayerList players=players />*/}
            </div>
        )
    }
});

var GeneralGameInfo = React.createClass({
   render: function() {
       return (
       <div id="game-info">
           <h1>Amazing dice game</h1>
           <h3>Current dice count: <span>{this.props.diceCount}</span></h3>
           <h3>Current player count: <span>{this.props.playerCount}</span></h3>
       </div>
       )
   }
});

var PlayerList = React.createClass({
    render: function() {
        var rows = [];
        this.props.players.forEach(function(player) {
           rows.push(<PlayerRow key={player.id} lastRollSum={player.lastRollSum}/>);
        });
        return (
            <div>
                <ul>
                    {rows}
                </ul>
            </div>
        )
    }
});

var PlayerRow = React.createClass({
    render: function() {
        return (
            <li key={this.props.key}>
                <div>
                    <span className="player-id">{this.props.key}</span>
                    <span className="player-last-roll-sum">{this.props.lastRollSum}</span>
                </div>
            </li>
        )
    }
});