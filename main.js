var counter = 0;
var players = [
    {
        symbol:'X',
        name:'dude',
        onBecomeCurrentPlayer: function(){
            $('.players').removeClass('selected');
            $('.players').addClass('selected');
        }
    },
    {
        symbol: 'O',
        name:'dudette',
        onBecomeCurrentPlayer: function(){
            $('.players').removeClass('selected');
            $('.players').addClass('selected');
        }
    }
];
var currentPlayer = 0;
$(document).ready(function() {
    applyClickHandlers();

});

function applyClickHandlers(){
    $('.gameCells').click(cellClickHandler);
}
function cellClickHandler(){
    changePlayer();
    cellShowSymbol(this);
}
function changePlayer(){
        currentPlayer = 1-currentPlayer;
        players[currentPlayer].onBecomeCurrentPlayer();

}

function cellShowSymbol(cellThatWasClicked){
    $(cellThatWasClicked).text(players[currentPlayer].symbol)
}

