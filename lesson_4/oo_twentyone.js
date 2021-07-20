const shuffle = require('shuffle-array');
let readline = require('readline-sync');

const SUITS = ['H', 'D', 'C', 'S'];
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10',
  'J', 'Q', 'K', 'A'];
const MAX_SCORE = 21;
const DEALERS_MINIMUM = 17;
const PLAYER_WIN_MESSAGE = 'You win!';
const DEALER_WIN_MESSAGE = 'Dealer won!';
const TIED_MESSAGE = 'Game was tied!';
const PLAYER = 'Player';
const DEALER = 'Dealer';
const TIED = 'Tied';

class ShuffledDeck {
  constructor() {
    this.deck = this.createDeck();
  }

  createDeck() {
    let deck = [];
    RANKS.forEach(rank => {
      SUITS.forEach(_ => {
        deck.push(rank);
      });
    });
    return shuffle(deck);
  }

  deal(number = 1) {
    return this.deck.splice(0, number);
  }
}

class Participant {
  static HIT = 'hit';
  static STAY = 'stay';

  constructor() {
    this.cards = [];
  }

  score() {
    let score = 0;
    this.cards.forEach(card => {
      if (['J', 'Q', 'K'].includes(card)) {
        score += 10;
      } else if (card === 'A') {
        score += 11;
      } else {
        score += Number(card);
      }
    });

    this.cards.filter(card => card === "A").forEach(_ => {
      if (score > MAX_SCORE) score -= 10;
    });

    return score;
  }

  resetHand() {
    this.cards = [];
  }

  isBusted() {
    return this.score() > MAX_SCORE;
  }
}


class Player extends Participant {
  static STARTING_AMOUNT = 5;
  static RICH_AMOUNT = 10;
  static POOR_AMOUNT = 0;

  constructor() {
    super();
    this.money = Player.STARTING_AMOUNT;
  }

  takeDollar() {
    this.money -= 1;
  }

  giveDollar() {
    this.money += 1;
  }

  isOutOfMoney() {
    return this.money === Player.POOR_AMOUNT;
  }

  isRich() {
    return this.money === Player.RICH_AMOUNT;
  }
}

class Dealer extends Participant {
  constructor() {
    super();
  }

  isAboveMinimum() {
    return this.score() >= DEALERS_MINIMUM;
  }
}

class TwentyOneGame {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
  }

  start() {
    let keepPlaying = true;
    while (keepPlaying) {
      this.play();

      if (this.player.isOutOfMoney()) {
        console.log('Sorry, you are out of money!');
        break;
      }

      if (this.player.isRich()) {
        console.log('You are rich!');
        break;
      }

      let keepPlayingResponse = readline.question('Would you like to keeping playing? (Y/N): ');
      keepPlaying = keepPlayingResponse.toLowerCase() === 'y';
    }

    this.displayGoodbyeMessage();
  }

  play() {
    this.resetGame();
    this.displayWelcomeMessage();
    this.dealCards();
    this.playerTurn();
    if (this.player.isBusted()) {
      this.playerBustedResult();
      return;
    }
    this.dealerTurn();
    if (this.dealer.isBusted()) {
      this.dealerBustedResult();
      return;
    }
    let winner = this.determineWinner();
    this.winnerResults(winner);
  }

  resetGame() {
    this.deck = new ShuffledDeck();
    this.player.resetHand();
    this.dealer.resetHand();
  }

  displayWelcomeMessage() {
    console.log('Welcome to Twenty One!');
  }

  dealCards() {
    this.player.cards.push(...this.deck.deal(2));
    this.dealer.cards.push(...this.deck.deal(2));
  }

  playerTurn() {
    while (true) {
      this.showState();
      let playersMove = readline.question('What would you like to do? (hit or stay) ');
      if (playersMove.toLowerCase() === Participant.HIT) {
        let newCard = this.deck.deal();
        this.player.cards.push(...newCard);
        if (this.player.isBusted()) {
          break;
        }
      } else if (playersMove.toLowerCase() === Participant.STAY) {
        break;
      } else {
        continue;
      }
    }
  }

  playerBustedResult() {
    this.revealCards();
    console.log('Player busted. Dealer wins!');
    this.player.takeDollar();
  }

  dealerTurn() {
    while (true) {
      if (this.dealer.isBusted() || this.dealer.isAboveMinimum()) {
        break;
      }

      let newCard = this.deck.deal();
      this.dealer.cards.push(...newCard);
    }
  }

  dealerBustedResult() {
    this.revealCards();
    console.log('Dealer busted. Player wins!');
    this.player.giveDollar();
  }

  showState() {
    console.clear();
    console.log('Your money: ' + this.player.money);
    console.log("Dealer's visible card: " + this.dealer.cards[0]);
    console.log("Your cards: " + this.player.cards.join(', '));
    console.log("Your points: " + this.player.score());
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing! Goodbye!');
  }

  winnerResults(winner) {
    this.revealCards();

    if (winner === PLAYER) {
      this.player.giveDollar();
      console.log(PLAYER_WIN_MESSAGE);
    } else if (winner === DEALER) {
      this.player.takeDollar();
      console.log(DEALER_WIN_MESSAGE);
    } else {
      console.log(TIED_MESSAGE);
    }
  }

  determineWinner() {
    let playerScore = this.player.score();
    let dealerScore = this.dealer.score();

    if (playerScore > dealerScore) {
      return PLAYER;
    } else if (dealerScore > playerScore) {
      return DEALER;
    } else {
      return TIED;
    }
  }

  revealCards() {
    console.clear();
    console.log("Your cards: " + this.player.cards.join(', '));
    console.log("Dealer's cards: " + this.dealer.cards.join(', '));
  }
}

let game = new TwentyOneGame();
game.start();