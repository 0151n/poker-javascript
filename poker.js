//Main poker game script
//create game instance
function run_game() {
    var game = new Game(5);
    var test = new Player("test");
    test.populate([],52,5);
    test.get_rank();
    //print hand
    for(var j = 0;j < 5;j++){
        var used = [];
        game.players[j].populate(used,52,5);
        game.players[j].get_rank();
        used = used.concat(used,game.players[j].hand);
    }
    var image;
    for(var j = 1;j < 5;j++){
        for(var i = 0;i < 5;i++){
           image = document.getElementById(("c" + j) + i);
           image.src = ("images/" + game.players[j].hand[i] + ".png");
            //document.write((("c" + j) + i));
        }
        //document.write("<h3>" + game.ranks[game.players[j].ranks[0]]);
       // document.write("<h3>" + ("c" + j) + i+ "</h3");
    }
    var winner = game.compare_players([true,true,true,true,true],0);
    if(winner > -1){
        document.getElementById("winner").value = (game.players[winner].name);
    }else if(winner == -1){
        document.getElementById("winner").value = ("Tie");
    }
}