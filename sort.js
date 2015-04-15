//hand sorting function
function sort_hand(hand){
    var changed = true;
    var temp = 0;
    while(changed == true){
        changed = false;
        for(var i = 0;i < hand.length;i++){
            if (hand[i] % 13 < hand[i - 1] % 13){
                 temp = hand[i];
                 hand[i] = hand[i - 1];
                 hand[i - 1] = temp;
                 changed = true;
            }
        }
    }
}