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
        let nums = "";
        myNumbers.forEach(number => {
            if (winningNumbers.includes(number)) {
                nums = nums + number + " ";
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
    let sum = 0;  
    await reader.on('line', (line) => {
    });
    await events.once(reader, 'close');


    return "" + sum;
}