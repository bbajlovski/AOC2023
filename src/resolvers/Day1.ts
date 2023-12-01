import fs from "fs";
import readline from "readline";
import events from "events";
import { findFirstDigit, findLastDigit } from "../tools/Utils";
   
export const resolveOne = async (filename: string): Promise<any> => {

    console.log("Part 1");

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    var calibrationSum = 0;  
    reader.on('line', (line) => {
        calibrationSum += (10*findFirstDigit(line) + findLastDigit(line));     
    });

    await events.once(reader, 'close');

    return "" + calibrationSum;
}

export const resolveTwo = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    var calibrationSum = 0;  
    reader.on('line', (line) => {
        calibrationSum += (10*findFirstDigit(line) + findLastDigit(line));     
    });

    await events.once(reader, 'close');

    return "" + calibrationSum;
}
