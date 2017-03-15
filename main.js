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
var winCheckArray=[];
var currentPlayer = 1;
var tttModel;
var firebaseObject;
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
    updatePlayerVisual();
}
function updatePlayerVisual(){
    players[currentPlayer].onBecomeCurrentPlayer();
}
function cellShowSymbol(cellThatWasClicked){
    $(cellThatWasClicked).text(players[currentPlayer].symbol)
}
//**********************************************************************************************************************
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
    saveData();
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
    populateWinCheckArray();
    saveData();
}
function populateWinCheckArray(){
    var boardSize = $('.gameType:checked').val();
    for (var i = 0; i < boardSize; i++) {
        winCheckArray[i]=[];
        for (var j = 0; j < boardSize; j++) {
            winCheckArray[i][j]='';
        }
    }
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
    populateWinCheckArray();
    tttModel = new GenericFBModel('gamekey',boardUpdated);
}
//**********************************************************************************************************************
function boardUpdated(fbGameObject){//firebase object data
    if(winCheckArray.length===0){
        return;
    }
    for(var i = 0; i < fbGameObject.gameState.length; i++){
        for(var j = 0; j < fbGameObject.gameState[i].length; j++){
           // if(newGameState)
            var row = i;
            var col = j;
            var playerID = fbGameObject.gameState[i][j];
            if(playerID!==''){
                $('.gameCells[row='+row+'][col='+col+']').text(players[playerID].symbol);
            } else {
                $('.gameCells[row='+row+'][col='+col+']').text('');
            }
        }
    }
    currentPlayer = fbGameObject.currentPlayer;
    winCheckArray = fbGameObject.gameState.slice();
    updatePlayerVisual();
    checkIfPlayerHasWon(currentPlayer);
}
//**********************************************************************************************************************
function saveData(){
    firebaseObject = {
        gameState: winCheckArray,
        currentPlayer: currentPlayer
    };
    tttModel.saveState(firebaseObject);
}
