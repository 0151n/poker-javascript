//Main poker game script
//create game instance
var game = new Game(5);
var test = new Player("test");
test.populate([],52,5);
test.get_rank();
//print hand
for(var j = 0;j < 5;j++){
    var used = [];
    game.players[j].populate(used,52,5);
    game.players[j].get_rank();
    document.write("<h2>" + game.players[j].name + "</h2>");
    document.write("<hr>");
    used = used.concat(used,game.players[j].hand);
    for(var i = 0;i < 5;i++){
        document.write(game.value_names[game.values[game.players[j].hand[i]]] + " " + game.suit_names[game.suits[game.players[j].hand[i]]] + "<br>");
    }
    document.write("<h3>" + game.ranks[game.players[j].ranks[0]] + "</h3><br><hr>");
}
var winner = game.compare_players([true,true,true,true,true],0);
if(winner > -1){
    document.write("<h2>" + game.players[winner].name + " Has Won</h2>");
}else if(winner == -1){
    document.write("<h2>Game Was a tie</h2>");
}