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
                    <span class="player-name">{this.props.id}</span>
                    <span class="player-id">{this.props.name}</span>
                    <span class="player-last-roll-sum">{this.props.lastRollSum}</span>
                </div>
            </li>
        )
    }
});