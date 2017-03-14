
var canIClick = true;
var players = [
    {
        symbol:'+',
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
//Possible winning combinations
// [0,0,0] [0, , ] [ ,0, ] [ , ,0] [ , , ] [ , , ] [0, , ] [ , ,0]
// [ , , ] [0, , ] [ ,0, ] [ , ,0] [0,0,0] [ , , ] [ ,0, ] [ ,0, ]
// [ , , ] [0, , ] [ ,0, ] [ , ,0] [ , , ] [0,0,0] [ , ,0] [0, , ]
var winCheckArray = [
    [],
    [],
    []
];
var currentPlayer = 1;
//**********************************************************************************************************************
$(document).ready(function() {
    applyClickHandlers();
});
//**********************************************************************************************************************
function applyClickHandlers(){
    $('#newGame').click(createGameBoard);
    $('.gameCells').click(cellClickHandler);
    $('#reset').click(resetGame);

}
//**********************************************************************************************************************
function cellClickHandler(){
    if (canIClick === true) {
        if ($(this).text() === '') {
            changePlayer();
            cellShowSymbol(this);
            pushToWinArray(this);
        }
        checkIfPlayerHasWon(currentPlayer);
    }
}
function changePlayer(){
        currentPlayer = 1-currentPlayer;
        players[currentPlayer].onBecomeCurrentPlayer();

}
function cellShowSymbol(cellThatWasClicked){
    $(cellThatWasClicked).text(players[currentPlayer].symbol)
}
//**********************************************************************************************************************
function pushToWinArray(x) {
    for (var i = 0; i < winCheckArray.length; i++) {
        if ($(x).hasClass('row' + [i].toString())) {
            for (var j = 0; j < winCheckArray.length; j++) {
                if ($(x).hasClass('col' + [j].toString())) {
                    winCheckArray[i][j] = currentPlayer;
                }
            }
        }
    }
}
//**********************************************************************************************************************
function checkIfPlayerHasWon(y){
    if($('.gameType:checked').val() == 3) {
        for (var i = 0; i < winCheckArray.length; i++) {
            for (var j = 0; j < winCheckArray[i].length; j++) {
                if (winCheckArray[i][j] === y && winCheckArray[i][j + 1] === y && winCheckArray[i][j + 2] === y
                    || winCheckArray[i][j] === y && winCheckArray[i + 1][j] === y && winCheckArray[i + 2][j] === y
                    || winCheckArray[i][j] === y && winCheckArray[i + 1][j + 1] === y && winCheckArray[i + 2][j + 2] === y
                    || winCheckArray[i][j + 2] === y && winCheckArray[i + 1][j + 1] === y && winCheckArray[i + 2][j] === y) {
                    setTimeout(function () {
                        alert(players[currentPlayer].symbol + ' has won')
                    }, 400);
                    canIClick = false;
                }
            }
        }
    }
}
//**********************************************************************************************************************
function resetGame(){
    $('.gameCells').text('');
    currentPlayer =1;
    canIClick = true;
    winCheckArray = [
        [],
        [],
        []
    ]
}
//**********************************************************************************************************************
function createGameBoard(){
    $("#gameContainer").empty();
    var boardPiece;
    var boardSize = $('.gameType:checked').val();
    for (var i = 0; i < boardSize; i++) {
        for (var j = 0; j < boardSize; j++) {
            boardPiece = $('<div>').addClass('gameCells' + ' ' + 'row' + [i].toString() + ' ' + 'col' + [j].toString()).css({
                'width': (100/boardSize)+'%',
                'height': (100/boardSize)+'%'
            });
            $('#gameContainer').append(boardPiece);
        }
    }
    applyClickHandlers();
    resetGame();
}

