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
$(document).ready(function() {
    applyClickHandlers();

});

function applyClickHandlers(){
    $('.gameCells').click(cellClickHandler);
    $('#reset').click(resetGame);
}
function cellClickHandler(){
    if($(this).text()==='') {
        changePlayer();
        cellShowSymbol(this);
        pushToWinArray(this);
    }
    checkIfPlayerHasWon(currentPlayer);
}
function changePlayer(){
        currentPlayer = 1-currentPlayer;
        players[currentPlayer].onBecomeCurrentPlayer();

}
function cellShowSymbol(cellThatWasClicked){
    $(cellThatWasClicked).text(players[currentPlayer].symbol)
}
//**********************************************************************************************************************
function pushToWinArray(x){
    if($(x).hasClass('row1')) {
        if($(x).hasClass('col1')){
            winCheckArray[0][0] = currentPlayer;
        }
        else if($(x).hasClass('col2')){
            winCheckArray[0][1] = currentPlayer;
        }
        else if($(x).hasClass('col3')){
            winCheckArray[0][2] = currentPlayer;
        }
    }
    else if($(x).hasClass('row2')){
        if($(x).hasClass('col1')){
            winCheckArray[1][0] = currentPlayer;
        }
        else if($(x).hasClass('col2')){
            winCheckArray[1][1] = currentPlayer;
        }
        else if($(x).hasClass('col3')){
            winCheckArray[1][2] = currentPlayer;
        }
    }
    else if($(x).hasClass('row3')){
        if($(x).hasClass('col1')){
            winCheckArray[2][0] = currentPlayer;
        }
        else if($(x).hasClass('col2')){
            winCheckArray[2][1] = currentPlayer;
        }
        else if($(x).hasClass('col3')){
            winCheckArray[2][2] = currentPlayer;
        }
    }
}
//**********************************************************************************************************************
function checkIfPlayerHasWon(y){
    for (var i=0; i<winCheckArray.length;i++){
        for(var j=0; j<winCheckArray[i].length;j++){
            if(j+2 === undefined){
                return;
            }
            if(winCheckArray[i][j] === y && winCheckArray[i][j+1] === y && winCheckArray[i][j+2] === y
            || winCheckArray[i][j] === y && winCheckArray[i+1][j] === y && winCheckArray[i+2][j] === y
            || winCheckArray[i][j] === y && winCheckArray[i+1][j+1] === y && winCheckArray[i+2][j+2] === y
            || winCheckArray[i][j+2] === y && winCheckArray[i+1][j+1] === y && winCheckArray[i+2][j] === y)
                alert(players[currentPlayer].symbol + ' has won');
        }
    }
}
