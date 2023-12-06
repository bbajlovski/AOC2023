import fs from "fs";
import readline from "readline";
import events from "events";
import { isDigit, removeDoubleWhitespaces } from "../tools/Utils";
import { time } from "console";


   
export const resolveOne = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    let product = 0;
    let times: string[] = [];
    let distances: string[] = [];
    await reader.on('line', (line) => {
        if (line.startsWith("Time:")) {
            times = removeDoubleWhitespaces(line.split(":")[1].trim()).split(" ");
        }
        if (line.startsWith("Distance:")) {
            distances = removeDoubleWhitespaces(line.split(":")[1].trim()).split(" ");
        }
    });
    await events.once(reader, 'close');

    times.forEach((time, index) => {
        product = product === 0 ? calculateOptions(+time, +distances[index]) : product * calculateOptions(+time, +distances[index]);
    });
   

    return "" + product;
}

export const resolveTwo = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    let product = 0;
    let time = 0;
    let distance = 0;
    await reader.on('line', (line) => {

        if (line.startsWith("Time:")) {
            time = +line.split(":")[1].trim().replaceAll(" ", "");
        }
        if (line.startsWith("Distance:")) {
            distance = +line.split(":")[1].trim().replaceAll(" ", "");
        }
    });
    await events.once(reader, 'close');

    product = calculateOptions(time, distance);

    return "" + product;
}

const calculateOptions = (time: number, distance: number) : number => {
    let winningOptions = 0;

    for (let waitTime = 0; waitTime <= time; waitTime++) {
        winningOptions += waitTime * (time - waitTime) > distance ? 1 : 0;
    }

    return winningOptions;
}