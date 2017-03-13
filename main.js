

$(document).ready(function(){

    function cellClickX(){
        $('.gameCells').click(function(){
            $(this).text('X');
        });
    }
    function cellClickO(){
        $('.gameCells').click(function(){
            $(this).text('O');
        });
    }

    function clickHandler(){
        cellClickX();
        cellClickO();
    }
    clickHandler();
});