var counter = 0;
var players = [
    {
        symbol:'X',
        name:'dude',
        onBecomeCurrentPlayer: function(){
            $('#playerOne').removeClass('selected');
            $('#playerTwo').addClass('selected');
        }
    },
    {
        symbol: 'O',
        name:'dudette',
        onBecomeCurrentPlayer: function(){
            $('#playerTwo').removeClass('selected');
            $('#playerOne').addClass('selected');
        }
    }
];
var currentPlayer = 1;
$(document).ready(function() {
    applyClickHandlers();

});

function applyClickHandlers(){
    $('.gameCells').click(cellClickHandler);
}
function cellClickHandler(){
    if($(this).text()==='') {
        changePlayer();
        cellShowSymbol(this);
    }
}
function changePlayer(){
        currentPlayer = 1-currentPlayer;
        players[currentPlayer].onBecomeCurrentPlayer();

}

function cellShowSymbol(cellThatWasClicked){
    $(cellThatWasClicked).text(players[currentPlayer].symbol)
}

