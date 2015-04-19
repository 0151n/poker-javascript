//Main poker game script
//create game instance
var called = false;
var folded = false;

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
function show_all(){
    var image;
    var rank;
    //show computer images
    for(var j = 1;j < 5;j++){
        for(var i = 0;i < 5;i++){
           image = document.getElementById(("c" + j) + i);
           image.src = ("images/" + game.players[j].hand[i] + ".png");
        }
        rank = document.getElementById("c" + j + "rank");
        rank.value = players[j].rank[0];
    }
}
function hide_all(){
      var image;
      var rank;
      //hide computer images
      for(var j = 1;j < 5;j++){
        for(var i = 0;i < 5;i++){
           image = document.getElementById(("c" + j) + i);
           image.src = ("images/54.png");
        }
        rank = document.getElementById("c" + j + "rank");
        rank.value = "--------";
      }
}
function reset_bets(){
    var playerbet = document.getElementById("playerbet");
    var playerbank = document.getElementById("playerbank");
    var totalbets = document.getElementById("totalbets");
    playerbet.value = "$" + game.players[0].bet;
    playerbank.value = "$" + game.players[0].bank;
    totalbets.value = "$" + game.sum_bets();
    for(var j = 1;j < 5;j++){
        var computerbet = document.getElementById("c" + j + "bet");
        var computerbank = document.getElementById("c" + j + "bank");
        computerbet.value = "$" + game.players[j].bet;
        computerbank.value = "$" + game.players[j].bank;
        if(game.players[j].folded){
            document.getElementById("c" + j).style.color = "red"
        }
    }
}
function reset_all(){
    document.getElementById("totalbets").value = "$0";
    hide_all();
    document.getElementById("winner").value = "-----";
    document.getElementById("rnumber").value = game.round;
    for(var i = 1;i < 5;i++){
        document.getElementById("c" + i).style.color = "black"   
    }
}
function call(){    
    if(!called){
        show_all();
        var winner = game.compare_players([true,true,true,true,true],0);
    if(winner > -1){
        document.getElementById("winner").value = (game.players[winner].name);
    }else if(winner == -1){
        document.getElementById("winner").value = ("Tie");
    }
    }
}
