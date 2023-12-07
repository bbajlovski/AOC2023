import fs from "fs";
import readline from "readline";
import events from "events";
import { Hand, Card, PokerMachine } from "../assets/PokerMachine";
   
export const resolveOne = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    let totalWinnings = 0;
    let hands: Hand[] = [];
    await reader.on('line', (line) => {
        hands.push({
            cards: line.split(" ")[0].split("").map(card => card as Card),
            bid: +line.split(" ")[1]
        });        
    });
    await events.once(reader, 'close');

    let pokerMachine = new PokerMachine();
    let sortedHands = hands.sort((handOne, handeTwo) => {
        return pokerMachine.compareHands(handOne, handeTwo);
    });

    sortedHands.forEach((hand, index) => {
        totalWinnings += (hand.bid*(index+1));
    });
   

    return "" + totalWinnings;
}

export const resolveTwo = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    let sum = 0;
    await reader.on('line', (line) => {

    });
    await events.once(reader, 'close');


    return "" + sum;
}