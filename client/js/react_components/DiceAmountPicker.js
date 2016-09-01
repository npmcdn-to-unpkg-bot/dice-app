var DiceAmountPicker = React.createClass({
    render: function() {
        return (
            <div>
                <span>As the number of dices have not been set yet, you have honour to do that</span>
                <DicePickRow />
                <input type="button">Set!</input>
            </div>
        )
    }
});

var DicePickRow = React.createClass({
    render: function() {
        var rows = [];
        for (var i = 0; i < 4; i++) { //static for now
            rows.push(<li>i</li>);
        }
        return (
            <ul>
                {rows}
            </ul>
        )
    }
});