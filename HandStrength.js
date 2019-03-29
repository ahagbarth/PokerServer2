
handStrength(['cardhearts1', 'cardspades1'], ['cardspades7','cardhearts10', 'carddiamonds1'], ['cardclubs1'], ['cardspades9']);




function handStrength(hand , firstThreeCards , fourthCard, fifthCard) {
	const cardvalue = require('./CardValue.js');
	const handValue = require('./HandResult.js');


	var pairs;
	var strength;
	var handResult;

	var card1Matches =0;
	var card2Matches = 0;

	var cardHands = [];
	var cardBoard = [];
	
	var handCard1 = hand[0];
	var handCard2 = hand[1];

	var tableCard1 = firstThreeCards[0];
	var tableCard2 = firstThreeCards[1];
	var tableCard3 = firstThreeCards[2];
	var tableCard4 = fourthCard[0];
	var tableCard5= fifthCard[0];


	var HandCard1 = cardvalue.cardValue(handCard1);
	var HandCard2 = cardvalue.cardValue(handCard2);


	var TableCard1 = cardvalue.cardValue(tableCard1);
	var TableCard2 = cardvalue.cardValue(tableCard2);
	var TableCard3 = cardvalue.cardValue(tableCard3);
	var TableCard4 = cardvalue.cardValue(tableCard4);
	var TableCard5= cardvalue.cardValue(tableCard5);

	cardHands.push(HandCard1 , HandCard2);

	cardBoard.push(TableCard1, TableCard2, TableCard3, TableCard4, TableCard5);

	for(x in cardBoard) {
		if(cardBoard[x] == HandCard1) {
			card1Matches += 1; 
		}
		if(cardBoard[x] == HandCard2) {
			card2Matches += 1;
		}
	}

	var handResult = handValue.handResult(HandCard1 , HandCard2 ,card1Matches, card2Matches);


	console.log("" + card1Matches + "    /   " + card2Matches + "    /  result: " + handResult);


	//return strength;
}


exports.handStrength = handStrength;