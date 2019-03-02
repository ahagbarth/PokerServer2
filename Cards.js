function createPack() {
  var suits = new Array("cardhearts", "cardclubs", "cardspades", "carddiamonds");
  var pack = new Array();
  var n = 52;
  var index = n / suits.length;

  var count = 0;
  for(i = 0; i <= 3; i++)
      for(j = 1; j <= index; j++)
          pack[count++] = suits[i] + j;

  return pack;
}

function shufflePack(pack) {
  var i = pack.length, j, tempi, tempj;
  if (i === 0) return false;
  while (--i) {
     j = Math.floor(Math.random() * (i + 1));
     tempi = pack[i];
     tempj = pack[j];
     pack[i] = tempj;
     pack[j] = tempi;
   }
  return pack;
}

function draw(pack, amount) {
  var cards = new Array();
  cards = pack.slice(0, amount);

  pack.splice(0, amount);


  return cards;
}

function playCard(amount, hand, index) {
  hand.splice(index, amount)
  return hand;
}

exports.createPack = createPack;
exports.shufflePack = shufflePack;
exports.draw = draw;
exports.playCard = playCard;