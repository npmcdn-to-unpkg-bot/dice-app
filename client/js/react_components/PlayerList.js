var PlayerList = React.createClass({
    render: function() {
        var rows = [];
        this.props.players.forEach(function(player) {
           rows.push(<PlayerRow id={player.id} name={player.name} lastRollSum={player.lastRollSum}/>);
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
            <li>
                <div>
                    <span className="player-name">{this.props.id}</span>
                    <span className="player-id">{this.props.name}</span>
                    <span className="player-last-roll-sum">{this.props.lastRollSum}</span>
                </div>
            </li>
        )
    }
});