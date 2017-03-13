
 var counter = 0;
$(document).ready(function(){


    function cellClick(){
        $('.gameCells').click(function(){
            if (counter%2 === 0) {
                $(this).text('X');
            }
            else{
                $(this).text('O');
            }
            counter++;
        });
    }

    function clickHandler(){
        cellClick();
    }
    clickHandler();

});