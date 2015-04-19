function Game(players) {
    this.decksize = 52;
    
	//players
	this.players = new Array();
	this.num_players = players;
    //create and populate deck 
    this.cards = new Array(this.decksize);
    for (var i = 0;i < this.decksize;i++){
        this.cards[i] = i;
    }
    var round = 0;
    //value names array
    this.value_names =  ["Two of",
                        "Three of",
                        "Four of",
                        "Five of",
                        "Six of",
                        "Seven of",
                        "Eight of",
                        "Nine of",
                        "Ten of",
                        "Jack of",
                        "Queen of",
                        "King of",
                        "Ace of"];
    //names of suits
    this.suit_names = ["Hearts","Clubs","Spades","Diamonds"];
    
    //hand ranks
    this.ranks = ["Royal Flush",
                  "Straight Flush",
                  "Four of a Kind",
                  "Full House",
                  "Flush",
                  "Straight",
                  "Three of a Kind",
                  "Two Pairs",
                  "One Pair",
                  "High Card"];
    //define and populate suits array
    this.suits = new Array();
    this.values = new Array();
    
	for(var i = 0;i < this.decksize;i++){
		//sort cards into suits
		if(i < 13)  {
			 this.suits[i]= 0;
		 }
		 else if(i < 26) {
			this.suits[i]= 1;
		 }
		 else if(i < 39) {
			this.suits[i] = 2;
		}
		else {
			this.suits[i]= 3;
		}
		//sort cards into values
		this.values[i] = (this.cards[i] % 13)
	}
	//generate player hands
	this.players[0] = new Player("Player");
	for(var i = 1;i < 5;i++){
		this.players[i] = new Player("Computer " + i);	
	}
}

Game.prototype.print_deck = function(){
    for(var i = 0;i < 5;i++){
        document.write(this.players[i].name + "<br>");   
    }
}
Game.prototype.compare_players = function compare(ex_group,resolution){
    //rank arrays
    var f_ranks= []
    var f_subranks = []

    //populate rank arrays
    for(var i = 0;i < this.num_players;i++){
        //check that rank is not nil
        if (this.players[i].ranks[resolution] == null || !ex_group[i] || this.players[i].folded){
            //set f_rank element to a non-rank value so that it is discarded
            f_ranks.push(10);
            f_subranks.push(10);
        }else{
            //get appropriate rank for current resolution
            f_ranks.push(this.players[i].ranks[resolution]);
            f_subranks.push(this.players[i].subranks[resolution]);
        }
    }

    //copy and sort sf_ranks from f_ranks
    sf_ranks = f_ranks.slice();
    sort_hand(sf_ranks);

    //get max rank value from sf_ranks
    var max = sf_ranks[0];

    //initialize max_refs array
    var max_refs = [];

    //check for high card draw
    if (max == 10 || max == undefined){
        return -1;
    }

    //populate max_refs with values
    for(var i = 0;i < this.num_players;i++){
        if (f_ranks[i] == max){
            max_refs.push(i);
        }
    }
    //return winning player if ( only one had the maximum rank
    if (max_refs.length == 1){
        return max_refs[0];
      //check subrank if ( two players have the same rank
    }else{
        //initialize arrays
        var smax_subs = [];
        var max_subs = [];
        //generate max_subs
        for(var i = 0;i < max_refs.length;i++){
            max_subs.push(f_subranks[max_refs[i]]);
        }
        //copy and sort smax_subs
        smax_subs = max_subs.slice();
        sort_hand(smax_subs);
        //initialize subrank match array
        var smatch = [];
        //populate subrank match array
        for(var i = 0;i < max_subs.length;i++){
            if ( max_subs[i] == smax_subs[smax_subs.length -1]){
                smatch.push(max_refs[i]);
            }
        }
        //if ( only one subrank match
        if (smatch.length == 1 ){
            //return winner
            return max_refs[max_subs.indexOf(smax_subs[smax_subs.length -1])]; 
        }else{
            //create and populate exclusion array
            var exclude = [false,false,false,false,false];
            for(var i = 0;i < smatch.length;i++){
                exclude[i] == true;
            }
            //call self to check next level of ranks
            return compare(exclude, resolution + 1);
        }
    }
}
//get the sum of all the players bets
Game.prototype.sum_bets = new function(){ 
    var sum = 0;
    //loop through players array
    for(var i = 0;i < this.num_players;i++){
        sum += this.players[i].bet;
    }
    return sum;
}
//get bets made by ai players
Game.prototype.get_bets = new function(bet){
    //loop through ai players
    //random numbers generated in if statements create
    //the illusion of free will
    for(var i = 1;i < this.num_players;i++){
        //check if player has enough money and has not folded
        if(bet <= this.players[i].bank && !this.players[i].folded){
            //if player has a high rank
            if(players[i].ranks[0] < 8 || Math.floor(Math.random() * 1)== 1){
                 players[i].set_bet(bet);
            //if player has a pair of quite high value
            }else if (( players[i].ranks[0] == 8 && players[i].subranks[0] > 9) || Math.floor(Math.random() * 1) == 1){
                 players[i].set_bet(bet);
            //bluff
            }else if(Math.floor(Math.random() * 9) == 1){
                 players[i].set_bet(bet);
            }else{
                 players[i].folded = true;
            }
        }else{
            //puts "fold #{i}"
            players[i].folded = true;
        } 
    }
}
