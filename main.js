
var canIClick = true;
var players = [
    {
        symbol:'+',
        name:'Ninja',
        onBecomeCurrentPlayer: function(){
            $('#playerOne').removeClass('selected');
            $('#playerTwo').addClass('selected');
        }
    },
    {
        symbol: 'O',
        name:'Monk',
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
var winCheckArray;
var currentPlayer = 1;
var tttModel;
var firebaseObject = {
    gameState: winCheckArray
    //currentPlayer: players.symbol
};
//**********************************************************************************************************************
$(document).ready(function() {
    tttModel = new GenericFBModel('gamekey',boardUpdated);
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
        //saveData();//comment out when testing locally (firebase)
        boardUpdated();
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
function defineWinCheckArray(){
    if($('.gameType:checked').val()==4){
        winCheckArray = [[],[],[],[]];
    }
    else if($('.gameType:checked').val()==5){
        winCheckArray = [[],[],[],[],[]];
    }
    else {
        winCheckArray = [[],[],[]];
    }
}
function pushToWinArray(elementClicked) {
    for (var i = 0; i < winCheckArray.length; i++) {
        var currentRow = parseInt($(elementClicked).attr('row'));
        if (currentRow === i) {
            for (var j = 0; j < winCheckArray.length; j++) {
                var currentCol = parseInt($(elementClicked).attr('col'));
                if (currentCol === j) {
                    winCheckArray[i][j] = currentPlayer;
                }
            }
        }
    }
}
//**********************************************************************************************************************
function checkIfPlayerHasWon(playerNumber){
    var uWin = winCheckArray;
    if($('.gameType:checked').val() == 3) {
        for (var i = 0; i < uWin.length; i++) {
            if (uWin[i][0] === playerNumber && uWin[i][1] === playerNumber && uWin[i][2] === playerNumber
                || uWin[0][i] === playerNumber && uWin[1][i] === playerNumber && uWin[2][i] === playerNumber
                || uWin[i][0] === playerNumber && uWin[i + 1][1] === playerNumber && uWin[i + 2][2] === playerNumber
                || uWin[0][i + 2] === playerNumber && uWin[1][i + 1] === playerNumber && uWin[2][i] === playerNumber) {
                setTimeout(function () {
                    alert(players[currentPlayer].name + ' has won')
                }, 400);
                canIClick = false;
            }
        }
    }
    else if($('.gameType:checked').val() == 4) {
        for (var i = 0; i < uWin.length; i++) {
            if (uWin[i][0] === playerNumber && uWin[i][1] === playerNumber && uWin[i][2] === playerNumber && uWin[i][3] === playerNumber
                || uWin[0][i] === playerNumber && uWin[1][i] === playerNumber && uWin[2][i] === playerNumber && uWin[3][i] === playerNumber
                || uWin[i][0] === playerNumber && uWin[i + 1][1] === playerNumber && uWin[i + 2][2] === playerNumber && uWin[i + 3][3] === playerNumber
                || uWin[0][i + 3] === playerNumber && uWin[1][i + 2] === playerNumber && uWin[2][i+1] === playerNumber && uWin[3][i] === playerNumber) {
                setTimeout(function () {
                    alert(players[currentPlayer].name + ' has won')
                }, 400);
                canIClick = false;
            }
        }
    }
    else {
        for (var i = 0; i < uWin.length; i++) {
            if (uWin[i][0] === playerNumber && uWin[i][1] === playerNumber && uWin[i][2] === playerNumber && uWin[i][3] === playerNumber && uWin[i][4] === playerNumber
                || uWin[0][i] === playerNumber && uWin[1][i] === playerNumber && uWin[2][i] === playerNumber && uWin[3][i] === playerNumber && uWin[4][i] === playerNumber
                || uWin[i][0] === playerNumber && uWin[i + 1][1] === playerNumber && uWin[i + 2][2] === playerNumber && uWin[i + 3][3] === playerNumber && uWin[i + 4][4] === playerNumber
                ||uWin[0][i + 4] === playerNumber && uWin[1][i + 3] === playerNumber && uWin[2][i+2] === playerNumber && uWin[3][i+1] === playerNumber && uWin[4][i] === playerNumber) {
                setTimeout(function () {
                    alert(players[currentPlayer].name + ' has won')
                }, 400);
                canIClick = false;
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
            boardPiece = $('<div>').addClass('gameCells').css({
                'width': (100/boardSize)+'%',
                'height': (100/boardSize)+'%'
            }).attr({row:[i], col:[j]});
            $('#gameContainer').append(boardPiece);
        }
    }
    applyClickHandlers();
    resetGame();
    defineWinCheckArray();
}

function boardUpdated(fbObjectData){//firebase object data
    //var arrayOfData = fbObjectData.data;
    var arrayOfData = winCheckArray;
    console.log(arrayOfData);
    for(var i = 0; i < arrayOfData.length-1; i++){
        for(var j = 0; j < arrayOfData[i].length-1; j++){
            $('.gameCells.row'+i+'.col,'+j).text(players[arrayOfData[i][j]].symbol);
        }
    }
}
function saveData(){
    console.log('saving');
    tttModel.saveState(firebaseObject);
}

