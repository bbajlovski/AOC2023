import fs from "fs";
import readline from "readline";
import events from "events";
import { removeDoubleWhitespaces } from "../tools/Utils";

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
    let steps = "";
    let locations = new Map<string, Location>();
    await reader.on('line', (line) => {
        if (lineNumber === 0) {
            steps = line;
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

    sum = countSteps(steps, locations);
    

    return "" + sum;
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

const countSteps = (steps: string, locations: Map<string, Location>): number => {
    let count = 0;
    let found = false;
    let nextStep = "AAA";

    while (!found) {
        steps.split("").forEach(step => {
            let location = locations.get(nextStep);
            count++;
            if (step === "L") {
                nextStep = location?.left || "";
            }
            
            if (step === "R"){
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