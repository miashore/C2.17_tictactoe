var canIClick = true;
var player1Click = true;
var player2Click = false;
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
var winCheckArray=[];
var currentPlayer = 1;
var tttModel;
//**********************************************************************************************************************
$(document).ready(function() {
    $("#backgroundMusic").prop('volume',0).animate({volume:.1},15000).get(0).play();
    applyClickHandlers();
});
//**********************************************************************************************************************
function applyClickHandlers(){
    $('#newGame').click(createGameBoard);
    $('.gameCells').click(cellClickHandler);
    $('#reset').click(resetGame);
    $('#pauseMusic').click(pauseMusic);
    $('#playMusic').click(playMusic);
    $('.modalArea').click(modalClose);
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
function playSound(){
    $('#karateChop').get(0).play();
}
function pauseMusic(){
    $('#backgroundMusic').trigger('pause');
}
function playMusic(){
    $('#backgroundMusic').trigger('play');
}
function modalForNinjaWin() {
    $('#ninjaWin').css('display', 'block');
    canIClick = false;
}
function modalForMonkWin() {
    $('#monkWin').css('display', 'block');
    canIClick = false;
}
function modalClose(){
    $('.modalArea').css('display','none');
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
    playSound();
    var uWin = winCheckArray;
    if($('.gameType:checked').val() == 3) {
        for (var i = 0; i < uWin.length; i++) {
            if (uWin[i][0] === playerNumber && uWin[i][1] === playerNumber && uWin[i][2] === playerNumber
                || uWin[0][i] === playerNumber && uWin[1][i] === playerNumber && uWin[2][i] === playerNumber
                || uWin[i][0] === playerNumber && uWin[i + 1][1] === playerNumber && uWin[i + 2][2] === playerNumber
                || uWin[0][i + 2] === playerNumber && uWin[1][i + 1] === playerNumber && uWin[2][i] === playerNumber) {
                if(currentPlayer === 0) {
                    modalForNinjaWin();
                }else{
                    modalForMonkWin();
                }
            }
        }
    }
    else if($('.gameType:checked').val() == 4) {
        for (var i = 0; i < uWin.length; i++) {
            if (uWin[i][0] === playerNumber && uWin[i][1] === playerNumber && uWin[i][2] === playerNumber && uWin[i][3] === playerNumber
                || uWin[0][i] === playerNumber && uWin[1][i] === playerNumber && uWin[2][i] === playerNumber && uWin[3][i] === playerNumber
                || uWin[i][0] === playerNumber && uWin[i + 1][1] === playerNumber && uWin[i + 2][2] === playerNumber && uWin[i + 3][3] === playerNumber
                || uWin[0][i + 3] === playerNumber && uWin[1][i + 2] === playerNumber && uWin[2][i+1] === playerNumber && uWin[3][i] === playerNumber) {
                if(currentPlayer === 0) {
                    modalForNinjaWin();
                }else{
                    modalForMonkWin();
                }
            }
        }
    }
    else {
        for (var i = 0; i < uWin.length; i++) {
            if (uWin[i][0] === playerNumber && uWin[i][1] === playerNumber && uWin[i][2] === playerNumber && uWin[i][3] === playerNumber && uWin[i][4] === playerNumber
                || uWin[0][i] === playerNumber && uWin[1][i] === playerNumber && uWin[2][i] === playerNumber && uWin[3][i] === playerNumber && uWin[4][i] === playerNumber
                || uWin[i][0] === playerNumber && uWin[i + 1][1] === playerNumber && uWin[i + 2][2] === playerNumber && uWin[i + 3][3] === playerNumber && uWin[i + 4][4] === playerNumber
                ||uWin[0][i + 4] === playerNumber && uWin[1][i + 3] === playerNumber && uWin[2][i+2] === playerNumber && uWin[3][i+1] === playerNumber && uWin[4][i] === playerNumber) {
                if(currentPlayer === 0) {
                    modalForNinjaWin();
                }else{
                    modalForMonkWin();
                }
            }
        }
    }
}
//**********************************************************************************************************************
function resetGame(){
    $('.gameCells').remove();
    $('#newGame').css('display','block');
    $('#reset').css('display','none');
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
    if($('#passwordInput').val() !== '') {
        $('#newGame').css('display', 'none');
        $('#reset').css('display', 'block');
        $('#passwordInput').css('display','none');
        $("#gameContainer").empty();
        var boardPiece;
        var boardSize = $('.gameType:checked').val();
        for (var i = 0; i < boardSize; i++) {
            for (var j = 0; j < boardSize; j++) {
                boardPiece = $('<div>').addClass('gameCells').css({
                    'width': (100 / boardSize) + '%',
                    'height': (100 / boardSize) + '%'
                }).attr({row: [i], col: [j]});
                $('#gameContainer').append(boardPiece);
            }
        }
        applyClickHandlers();
        populateWinCheckArray();
        var $input = $('#passwordInput').val();
        if(!tttModel) {
            tttModel = new GenericFBModel($input, boardUpdated);
        }
    }
}
//**********************************************************************************************************************
function boardUpdated(fbGameObject){
    if(winCheckArray.length===0){
        return;
    }
    for(var i = 0; i < fbGameObject.gameState.length; i++){
        for(var j = 0; j < fbGameObject.gameState[i].length; j++){
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
    var firebaseObject = {
        gameState: winCheckArray,
        currentPlayer: currentPlayer
    };
    tttModel.saveState(firebaseObject);
}
