import fs from "fs";
import readline from "readline";
import events from "events";
import { isDigit, removeDoubleWhitespaces } from "../tools/Utils";


   
export const resolveOne = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    let gameSum = 0;
    await reader.on('line', (line) => {
        const game = line.split(":");
        const combinations = game[1].trim().split("|");
        const myNumbers = removeDoubleWhitespaces(combinations[0].trim()).split(" ");
        const winningNumbers = removeDoubleWhitespaces(combinations[1].trim()).split(" ");

        let earnedPoints = 0;
        myNumbers.forEach(number => {
            if (winningNumbers.includes(number)) {
                earnedPoints = earnedPoints === 0 ? 1 : earnedPoints * 2;
            }
        });
        gameSum += earnedPoints;
    });
    await events.once(reader, 'close');

    return "" + gameSum;
}

export const resolveTwo = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });
1
    let gameSum = 0;
    let cardWinnerCounts: number[] = [];
    let totalCards: number[] = [];
    await reader.on('line', (line) => {
        const game = line.split(":");
        const combinations = game[1].trim().split("|");
        const myNumbers = removeDoubleWhitespaces(combinations[0].trim()).split(" ");
        const winningNumbers = removeDoubleWhitespaces(combinations[1].trim()).split(" ");

        let winnerCounts = 0;
        myNumbers.forEach(number => {
            if (winningNumbers.includes(number)) {
                winnerCounts++;
            }
        });
        cardWinnerCounts.push(winnerCounts);
        totalCards.push(1);
        
    });
    await events.once(reader, 'close');

    let index = 0;
    cardWinnerCounts.forEach(winnerCounts => {
        for (let deltaIndex = index + 1; deltaIndex <= index + winnerCounts; deltaIndex++) {
            totalCards[deltaIndex] += totalCards[index];            
        }

        index++;
    });
    
    totalCards.forEach(totalCard => {
        gameSum += totalCard;
    });

    return "" + gameSum;
}