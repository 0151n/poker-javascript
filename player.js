//JavaScript player class
function Player(name){
    this.name = name;
    this.hand = new Array();
    this.handsize = 0;
    this.subranks = new Array();
    this.ranks = new Array();
    this.folded = false;
    this.bet = 0;
    this.bank = 1000;
}
Player.prototype.populate = function (used,decksize,handsize){
    this.handsize = handsize;
    var temp = 0;
    for(var i = 0;i < handsize;i++){
        temp = Math.floor(Math.random() * 51);
        while((this.hand.indexOf(temp) >= 0) || (used.indexOf(temp) >= 0)){
            temp = Math.floor(Math.random() * 51);
        }
        this.hand.push(temp);
        sort_hand(this.hand);
    }
}
Player.prototype.get_rank = function(){
    //variables
    var pair = false;
    var same = false;
    var same_ = true;
    var usedindex = 0;
    var subranking = 0;
    if (this.handsize == 0 ) {
        return 0;
    }

    //straight
    same = true;
    for(var i = 0;i < this.handsize - 1;i++){ 
        if ((this.hand[i + 1] % 13) == (this.hand[i] % 13) + 1 && same == true ) {
            //do nothing
        }else{
            same = false;
        }
    }
    if ( same == true ) { 
            this.ranks.push(5);
            this.subranks.push( this.hand[this.handsize - 1] % 13);		
    }

    //straight-flush
    for(var i = 0;i < this.handsize - 1;i++){
        if ( this.hand[0] / 13 != this.hand[i] / 13 ) {
            same_ = false;
        }
    }
    if ( same && same_ ) {
        this.ranks.push(1);
    }
    //Full House
    for(var i = 2;i < 5;i++){
        if ( (this.hand[i] % 13) == (this.hand[i-1] % 13) && (this.hand[i] % 13) == (this.hand[i-2] % 13) ) {
            if ( i == 2 ) {
                if ((this.hand[i + 1] % 13) == (this.hand[i + 2] % 13) ) {
                    this.subranks = (this.hand[0] % 13) + (this.hand[3] % 13);
                    this.ranks.push(3);
                    break;
                }
            }
            else if ( i == 4 ) {
                if (((this.hand[i - 3] % 13) == (this.hand[i - 4 ] % 13)) ) {
                    this.subranks.push((this.hand[0] % 13) + (this.hand[4] % 13));
                    this.ranks.push(3);
                    break;
                }
            }
        }
    }
    //royal flush
    if ( (this.hand[0] / 13) == (this.hand[1] / 13) && (this.hand[0] / 13) == (this.hand[2] / 13) && (this.hand[0] / 13) == (this.hand[3] / 13) && (this.hand[0] / 13) == (this.hand[4] / 13) ) {
        if ( (this.hand[0] % 13 == 8) && (this.hand[1] % 13 == 9) && (this.hand[2] % 13 == 10) && (this.hand[3] % 13 == 11) && (this.hand[4] % 13 == 12) ) {
            this.ranks.push(0);
        }
    }
    //Flush
    if ((this.hand[0] / 13) == (this.hand[1] / 13) && (this.hand[0] / 13) == (this.hand[2] / 13) && (this.hand[0] / 13) == (this.hand[3] / 13) && (this.hand[0] / 13) == (this.hand[4] / 13) ) {
        this.subranks.push(this.hand[0] % 13);
        this.ranks.push(4);
    }
    //four of a kind
    for(var i = 3;i < 5;i++){
        if ((this.hand[i] % 13) == (this.hand[i-1] % 13) && (this.hand[i] % 13) == (this.hand[i-2] % 13) && (this.hand[i] % 13) == (this.hand[i-3] % 13) ) {
            this.subranks.push(this.hand[i] % 13);
            this.ranks.push(2);
        }
    }
    //three of a kind
    for(var i = 2;i < 5;i++){
        if ( (this.hand[i] % 13) == (this.hand[i-1] % 13) && (this.hand[i] % 13) == (this.hand[i-2] % 13) ) {
            this.subranks.push(this.hand[i] % 13);
            this.ranks.push(6);
            break;
        }
    }
    //two pairs
    for(var i = 1;i < 5;i++){	
        if ((this.hand[i] % 13) == (this.hand[i-1] % 13) && usedindex != i ) {
            if (pair) {
                if ( this.hand[usedindex] % 13 > this.hand[i] % 13 ) {
                    this.subranks.push(this.hand[userindex] % 13); 	
                }else{
                    this.subranks.push(this.hand[i] % 13);
                }
                this.ranks.push(7);
                break;
            }else{
                usedindex = i;
                pair = true;
            }
        }
    }
    //pair
    if ( pair == true ) {
        this.subranks.push(this.hand[usedindex] % 13);
        this.ranks.push(8);
    }
    //high card
    this.ranks.push(9);
    this.subranks.push(this.hand[4]);

    sort_hand(this.ranks);
    sort_hand(this.subranks);
}
Player.prototype.set_bet = function(bet){
		this.bet += parseInt(bet);
		this.bank -= parseInt(bet);
}
Player.prototype.reset = function(){
		//initialize varaibles
		this.hand = new Array();	
		this.subranks = new Array();
		this.ranks = new Array();
		this.folded = false;
		this.bet = 0;
}