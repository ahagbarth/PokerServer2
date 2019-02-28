class Deck {
	constructor() {
		this.deck = []
		this.dealtCards = []
	}

	generateDeck() {
		let card = (suit, value) => {
			this.name = value + ' of ' + suit
			this.suit = suit
			this.value = value

			return {name:this.name}
		}

		const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
		const suits = ['Clubs', 'Diamonds', 'Spades', 'Hearts']

		for (let i = 0; i < suits.length; i++) {
			for(let s = 0; s<values.length; s++) {
				this.deck.push(card(suits[i], values[s]))
			}
			
		}
	}

	shuffle() {

		var index = this.deck.length;
		var temp;
		var randIndex;

		while(0 != index) {

			randIndex = Math.floor(Math.random() * index--);

			temp = this.deck[index];

			this.deck[index] = this.deck[randIndex];
			this.deck[randIndex] = temp;

		}
		return this.deck;
	}

	printDeck() {
		if(this.deck.length == 0) {
			console.log('this deck has been generated')
		} else{
			for(let c = 0; c < this.deck.length; c++) {
				console.log(this.deck[c]);
			}
		}


	}
	Deal(){
		return this.deck.pop();
	}


}

module.exports = Deck;
