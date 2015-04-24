//Main poker game script
//create game instance
var called = false;
var folded = false;
var game = new Game(5);
function run_game() {
    //print hand
    for(var j = 0;j < 5;j++){
        var used = [];
        game.players[j].populate(used,52,5);
        game.players[j].get_rank();
        used = used.concat(used,game.players[j].hand);
    }
    var image;
    for(var i = 0;i < 5;i++){
           image = document.getElementById("p" + (i + 1));
           image.src = ("images/" + game.players[0].hand[i] + ".png");
    }
    document.getElementById("playerrank").value = game.ranks[game.players[0].ranks[0]];
    reset_bets();
    reset_all();
    hide_all();
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
        rank.value =  game.ranks[game.players[j].ranks[0]];
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
    playerbet.value = "$" +  parseInt(game.players[0].bet);
    playerbank.value = "$" + game.players[0].bank;
    totalbets.value = "$" + game.sum_bets();
    for(var j = 1;j < 5;j++){
        var computerbet = document.getElementById("c" + j + "bet");
        var computerbank = document.getElementById("c" + j + "bank");
        computerbet.value = "$" +  parseInt(game.players[j].bet);
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
    document.getElementById("rnumber").value = game.roundnum;
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
            game.players[winner].bank += game.sum_bets();
        }else if(winner == -1){
            document.getElementById("winner").value = ("Tie");
        }
        document.getElementById("nr").disabled = false;
        called = true;
    }
}
function fold(){    
    if(!folded){
        show_all();
        game.players[0].folded = true;
        var winner = game.compare_players([true,true,true,true,true],0);
        if(winner > -1){
            document.getElementById("winner").value = (game.players[winner].name);
            game.players[winner].bank += game.sum_bets();
            reset_bets();
        }else if(winner == -1){
            document.getElementById("winner").value = ("Tie");
        }
        document.getElementById("nr").disabled = false;
        folded = true;
    }
}
function next(){
    round();
    reset_all();
    reset_bets();
    hide_all();
    called = folded = false;
    document.getElementById("nr").disabled = true;
}
function round(){
    var used = [];
    for(var i = 0;i < 5;i++){
        game.players[i].reset();
        game.players[i].populate(used,52,5);
        game.players[i].get_rank();
        used = used.concat(used,game.players[i].hand);
    }
    var image;
    for(var i = 0;i < 5;i++){
           image = document.getElementById("p" + (i + 1));
           image.src = ("images/" + game.players[0].hand[i] + ".png");
    }
    document.getElementById("playerrank").value = game.ranks[game.players[0].ranks[0]];
    game.roundnum++;
}
function bet(){
        var addbet = document.getElementById("addbet").value;
        if(addbet != "" && addbet <= game.players[0].bank && !called && !folded){
            game.get_bets(addbet);
            game.players[0].set_bet(addbet);
            reset_bets();
    }
}