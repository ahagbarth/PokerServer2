
function cardValue(card) {
 var value;
    if(card == "cardhearts1" || card == "cardclubs1" || card == "cardspades1" || card == "carddiamonds1") {
        value = 1;
    }
    if(card == "cardhearts2" || card == "cardclubs2" || card == "cardspades2" || card == "carddiamonds2"){
        value= 2;
    }
    if(card == "cardhearts3" || card == "cardclubs3" || card == "cardspades3" || card == "carddiamonds3"){
        value= 3;
    }
    if(card == "cardhearts4" || card == "cardclubs4" || card == "cardspades4" || card == "carddiamonds4"){
        value= 4;
    }
    if(card == "cardhearts5" || card == "cardclubs5" || card == "cardspades5" || card == "carddiamonds5"){
        value= 5;
    }
    if(card == "cardhearts6" || card == "cardclubs6" || card == "cardspades6" || card == "carddiamonds6"){
        value= 6;
    }
    if(card == "cardhearts7" || card == "cardclubs7" || card == "cardspades7" || card == "carddiamonds7"){
        value= 7;
    }
    if(card == "cardhearts8" || card == "cardclubs8" || card == "cardspades8" || card == "carddiamonds8"){
        value= 8;
    }
    if(card == "cardhearts9" || card == "cardclubs9" || card == "cardspades9" || card == "carddiamonds9"){
        value= 9;
    }
    if(card == "cardhearts10" || card == "cardclubs10" || card == "cardspades10" || card == "carddiamonds10"){
        value= 10;
    }
    if(card == "cardhearts11" || card == "cardclubs11" || card == "cardspades11" || card == "carddiamonds11"){
        value= 11;
    }
    if(card == "cardhearts12" || card == "cardclubs12" || card == "cardspades12" || card == "carddiamonds12"){
        value= 12;
    }
    if(card == "cardhearts12" || card == "cardclubs12" || card == "cardspades12" || card == "carddiamonds12"){
        value= 13;
    }
    
    return value;
}


exports.cardValue = cardValue;