const { POINT_CONVERSION_COMPRESSED } = require("constants");

class PokDeng {
  constructor() {
    this.cards = this.createDeck();
  }

  static suit = ["Spades", "Diamonds", "Hearts", "Clubs"];
  static cardValues = [
    "Ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
  ];

  createDeck() {
    const cards = [];
    for (let s of PokDeng.suit) {
      for (let v of PokDeng.cardValues) {
        cards.push(`${v} of ${s}`);
      }
    }

    return cards;
  }

  shuffle() {
    // generate new
    const newCard = [...this.cards];
    for (let i = 0; i < newCard.length; i++) {
      const swapPosition = Math.floor(Math.random() * this.cards.length);
      // swap
      const temp = newCard[i];
      newCard[i] = newCard[swapPosition];
      newCard[swapPosition] = temp;
    }
    this.cards = newCard;
  }

  deal() {
    const hands = this.cards.splice(this.cards.length - 2);
    return hands;
  }

  static compareValue(playerHands, dealerHands) {
    let playerPoints = 0;
    let dealerPoints = 0;
    for (let ph of playerHands) {
      const val = this.findValue(ph);
      playerPoints += val;
    }

    for (let dh of dealerHands) {
      const val = this.findValue(dh);
      dealerPoints += val;
    }

    // player win ?
    if (playerPoints > dealerPoints) {
      return true;
    } else if (playerPoints < dealerPoints) {
      return false;
    } else {
      return null;
    }
  }

  static findValue(card) {
    const val = card.split(" ")[0];
    if (!PokDeng.cardValues.includes(val)) {
      throw new Error("Card value must be valid");
    }
    let value;
    switch (val) {
      case "Ace":
        value = 1;
        break;
      case "King":
        value = 0;
        break;
      case "Queen":
        value = 0;
        break;
      case "Jack":
        value = 0;
        break;
      case "10":
        value = 0;
        break;
      default:
        value = +val;
    }
    return value;
  }
}

class Player {
  constructor() {
    this.bets = 0;
    this.cards = new PokDeng();
    this.hands = [];
    this.dealerhands = [];

    this.cards.shuffle();
  }

  newTurn(bet) {
    this.hands = this.cards.deal();
    this.dealerhands = this.cards.deal();

    console.log(`You got ${this.hands[0]}, ${this.hands[1]}`);
    console.log(
      `the dealer got ${this.dealerhands[0]} , ${this.dealerhands[1]}`
    );

    const isWin = PokDeng.compareValue(this.hands, this.dealerhands);
    if (isWin === null) {
      // tied
      console.log(`You tied!!! received ${0} chips`);
      return;
    }

    if (isWin) {
      this.bets += bet;
      console.log(`You wons!!! received ${bet} chips`);
    } else {
      this.bets -= bet;
      console.log(`You lose!!! lost ${bet} chips`);
    }
  }
}

module.exports = Player;
