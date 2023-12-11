import fs from "fs";
import readline from "readline";
import events from "events";
import { Universe } from "../assets/Universe";

let universe: Universe;

export const resolveOne = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    let distanceSum = 0;
    let galaxies: string[][] = [];
    await reader.on('line', (line) => {
        let row: string[] = [];
        line.split("").forEach((move, columnIndex) => {
            row.push(move);
        });
        galaxies.push(row);
    });
    await events.once(reader, 'close');

    universe = new Universe(galaxies);
    universe.expandUniverse();
    distanceSum = universe.sumDistances();
       
    return "" + distanceSum;
}

export const resolveTwo = async (filename: string): Promise<any> => {
    
    let distanceSum = 0;

    universe.restoreOriginalGalaxies();
    distanceSum = universe.sumDistancesWithVirtualExpansion(1_000_000);

        
    return "" + distanceSum;
}
