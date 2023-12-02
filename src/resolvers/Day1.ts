import fs from "fs";
import readline from "readline";
import events from "events";
import { findFirstDigitalDigit, findLastDigitalDigit, firstDigit, lastDigit } from "../tools/Utils";


   
export const resolveOne = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    var calibrationSum = 0;  
    reader.on('line', (line) => {
        calibrationSum += (10*findFirstDigitalDigit(line) + findLastDigitalDigit(line));     
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
        calibrationSum += (10*firstDigit(line) + lastDigit(line));
    });

    await events.once(reader, 'close');

    return "" + calibrationSum;
}
