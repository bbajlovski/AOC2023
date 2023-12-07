export type Card =
  | "A"
  | "K"
  | "Q"
  | "J"
  | "T"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2";
export type Hand = {
  cards: Card[];
  bid: number;
};

type Combination =
  | "five-of-a-kind"
  | "four-of-a-kind"
  | "full-house"
  | "three-of-a-kind"
  | "two-pairs"
  | "one-pair"
  | "high-card";

export class PokerMachine {
  private cardStrengths: Card[];
  private combinationStrengths: Combination[];

  constructor() {
    this.cardStrengths = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "T",
      "J",
      "Q",
      "K",
      "A",
    ];
    this.combinationStrengths = [
      "high-card",
      "one-pair",
      "two-pairs",
      "three-of-a-kind",
      "full-house",
      "four-of-a-kind",
      "five-of-a-kind",
    ];
  }

  private isFiveOfAKind = (hand: Hand): boolean => {
    return this.countMaxCardRepeat(hand).includes(5);
  };

  private isFourOfAKind = (hand: Hand): boolean => {
    return this.countMaxCardRepeat(hand).includes(4);
  };

  private isFullHouse = (hand: Hand): boolean => {
    return this.countMaxCardRepeat(hand).includes(3) && this.countMaxCardRepeat(hand).includes(2);
  };

  private isThreeOfAKind = (hand: Hand): boolean => {
    return this.countMaxCardRepeat(hand).includes(3) && !this.countMaxCardRepeat(hand).includes(2);
  };

  private isTwoPairs = (hand: Hand): boolean => {
    return this.countMaxCardRepeat(hand).filter((cardRepeat) => cardRepeat === 2).length === 4;
  };

  private isOnePair = (hand: Hand): boolean => {
    return this.countMaxCardRepeat(hand).filter((cardRepeat) => cardRepeat === 2).length === 2;
  };

  private countMaxCardRepeat = (hand: Hand): number[] => {
    let cardRepeats: number[] = [];
    for (let index = 0; index < 5; index++) {
      let cardRepeat = hand.cards.filter((card) => card === hand.cards[index]).length;
      cardRepeats.push(cardRepeat);
    }
    return cardRepeats;
  }


  public compareHands = (handOne: Hand, handTwo: Hand): number => {
    let handOneCombination = this.getCombination(handOne);
    let handTwoCombination = this.getCombination(handTwo);

    if (
      this.combinationStrengths.indexOf(handOneCombination) >
      this.combinationStrengths.indexOf(handTwoCombination)
    ) {
      return 1;
    } else if (
      this.combinationStrengths.indexOf(handOneCombination) <
      this.combinationStrengths.indexOf(handTwoCombination)
    ) {
      return -1;
    } else {
      return this.compareCards(handOne, handTwo);
    }
  };

  public getCombination = (hand: Hand): Combination => {
    if (this.isFiveOfAKind(hand)) {
      return "five-of-a-kind";
    } else if (this.isFourOfAKind(hand)) {
      return "four-of-a-kind";
    } else if (this.isFullHouse(hand)) {
      return "full-house";
    } else if (this.isThreeOfAKind(hand)) {
      return "three-of-a-kind";
    } else if (this.isTwoPairs(hand)) {
      return "two-pairs";
    } else if (this.isOnePair(hand)) {
      return "one-pair";
    } else {
      return "high-card";
    }
  };

  private compareCards = (handOne: Hand, handTwo: Hand): number => {
    let handOneCards = handOne.cards;
    let handTwoCards = handTwo.cards;

    for (let index = 0; index < 5; index++) {
      if (
        this.cardStrengths.indexOf(handOneCards[index]) >
        this.cardStrengths.indexOf(handTwoCards[index])
      ) {
        return 1;
      } else if (
        this.cardStrengths.indexOf(handOneCards[index]) <
        this.cardStrengths.indexOf(handTwoCards[index])
      ) {
        return -1;
      }
    }
    return 0;
  };
}
