import fs from "fs";
import readline from "readline";
import events from "events";
import { isDigit } from "../tools/Utils";
import { Garden } from "../assets/Garden";


   
export const resolveOne = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    let minLocation = -1;
    let lines: string[] = [];
    let seeds: string[] = [];
    await reader.on('line', (line) => {
        if (line.indexOf("seeds: ") > -1) {
            seeds = line.split(":")[1].trim().split(" ");
        } else if (line.length > 0) {
            lines.push(line);
        }
    });
    await events.once(reader, 'close');

    const garden = new Garden(lines);
    seeds.forEach(seed => {
        const location = garden.getLocation(+seed);
        minLocation = minLocation === -1 ? location : Math.min(minLocation, location);
    });

    return "" + minLocation;
}

export const resolveTwo = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });
1
    let sum = 0;  
    let lines: string[] = [];
    await reader.on('line', (line) => {
        lines.push(line);   
    });
    await events.once(reader, 'close');

    

    return "" + sum;
}