
function handResult(firstCard, secondCard, firstCardPairs, secondCardPairs) {
    var result;
    if(firstCard == secondCard) {
        if(firstCardPairs == 0 && secondCardPairs == 0){
            result = "Pair"
        }
        if(firstCardPairs == 1 && secondCardPairs == 1){
            result = "Three of a Kind"
        }
        if(firstCardPairs == 2 && secondCardPairs == 2){
            result = "Four of a Kind"
        }
    }
    if(firstCardPairs == 0 && secondCardPairs == 1) {
        result = "Pair"
    }
    if(firstCardPairs == 0 && secondCardPairs == 2) {
        result = "Three of a Kind"
    }
    if(firstCardPairs == 0 && secondCardPairs == 3) {
        result = "Four of a Kind"
    }
    if(firstCardPairs == 1 && secondCardPairs == 0) {
        result = "Pair"
    }
    if(firstCardPairs == 2 && secondCardPairs == 0) {
        result = "Three of a Kind"
    }
    if(firstCardPairs == 3 && secondCardPairs == 0) {
        result = "Four of a Kind"
    }
    if(firstCardPairs == 1 && secondCardPairs == 1) {
        result = "Two Pairs"
    }
    if(firstCardPairs == 1 && secondCardPairs == 2) {
        result = "Full House"
    }
    if(firstCardPairs == 2 && secondCardPairs == 1) {
        result = "Full House"
    }




    return result;
   }
   
   
   exports.handResult = handResult;