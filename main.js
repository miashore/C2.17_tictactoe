
 var counter = 0;
$(document).ready(function(){

    function changePlayer(){
        $('.gameCells').click(function(){
            $('#playerOne').removeClass('selected');
            $('#playerTwo').addClass('selected');
        });

    }

    function cellClick(){
        $('.gameCells').click(function(){
            if (counter%2 === 0 && $(this).text()==='') {
                $(this).text('X');
            }
            else if(counter%2 !== 0 && $(this).text() ===''){
                $(this).text('O');
            }
            counter++;
        });
    }

    function clickHandler(){
        cellClick();
        changePlayer();
    }
    clickHandler();

});