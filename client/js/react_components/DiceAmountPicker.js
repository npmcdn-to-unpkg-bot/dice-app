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
        var diceNumbers = [1, 2, 3, 4];
        diceNumbers.map(function(number){
           return <li>{number}</li>
        });
        return (
            <ul>
                {diceNumbers}
            </ul>
        )
    }
});