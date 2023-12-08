import fs from "fs";
import readline from "readline";
import events from "events";
import { lcm, removeDoubleWhitespaces } from "../tools/Utils";

type Location = {
    readonly id: string;
    readonly left: string;
    readonly right: string    
}

export const resolveOne = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    let sum = 0;
    let lineNumber = 0;
    let moves = "";
    let locationsMap = new Map<string, Location>();
    await reader.on('line', (line) => {
        if (lineNumber === 0) {
            moves = line;
        }
        if (lineNumber > 1) {
            const cleanLine = removeDoubleWhitespaces(line.replaceAll("=", "").replaceAll("(", "").replaceAll(")", "").replaceAll(",", "")).trim();
            const id = cleanLine.split(" ")[0].trim();
            locationsMap.set(id, {
                id: id,
                left: cleanLine.split(" ")[1].trim(),
                right: cleanLine.split(" ")[2].trim()
            });
        }

        lineNumber++;
    });
    await events.once(reader, 'close');

    sum = countSteps(moves, locationsMap);
    

    return "" + sum;
}

export const resolveTwo = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    let sum = 0;
    let lineNumber = 0;
    let moves = "";
    let locations = new Map<string, Location>();
    await reader.on('line', (line) => {
        if (lineNumber === 0) {
            moves = line;
        }
        if (lineNumber > 1) {
            const cleanLine = removeDoubleWhitespaces(line.replaceAll("=", "").replaceAll("(", "").replaceAll(")", "").replaceAll(",", "")).trim();
            const id = cleanLine.split(" ")[0].trim();
            locations.set(id, {
                id: id,
                left: cleanLine.split(" ")[1].trim(),
                right: cleanLine.split(" ")[2].trim()
            });
        }

        lineNumber++;
    });
    await events.once(reader, 'close');

    sum = countStepsOfMultipleStarts(moves, locations);
    

    return "" + sum;
}

const countSteps = (moves: string, locationsMap: Map<string, Location>): number => {
    let count = 0;
    let found = false;
    let nextStep = "AAA";

    while (!found) {
        moves.split("").forEach(move => {
            let location = locationsMap.get(nextStep);
            count++;
            if (move === "L") {
                nextStep = location?.left || "";
            }
            
            if (move === "R"){
                nextStep = location?.right || "";
            }

            if (nextStep === "ZZZ") {
                found = true;
                return count;
            }
        });
    }

    return count;
}

const countStepZ = (moves: string, locationsMap: Map<string, Location>, startStep: string): number => {
    let count = 0;
    let found = false;
    let nextStep = startStep;

    while (!found) {
        moves.split("").forEach(move => {
            let location = locationsMap.get(nextStep);
            count++;
            if (move === "L") {
                nextStep = location?.left || "";
            }
            
            if (move === "R"){
                nextStep = location?.right || "";
            }

            if (nextStep.endsWith("Z")) {
                found = true;
                return count;
            }
        });
    }

    return count;
}

const countStepsOfMultipleStarts = (moves: string, locationsMap: Map<string, Location>): number => {
    let count = 0;
    let nextSteps: string[] = Array.from(locationsMap.keys()).filter(key => key.endsWith("A"));

    let endingZ: number[] = [];
    nextSteps.forEach(nextStep => {
        endingZ.push(countStepZ(moves, locationsMap, nextStep));
    });

    count = lcm(...endingZ);

    return count;
}