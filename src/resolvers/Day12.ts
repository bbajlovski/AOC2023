import fs from "fs";
import readline from "readline";
import events from "events";
import { containsOnly, countOccurrences, generateCombinations, removeDuplicates, replaceOccurrence } from "../tools/Utils";

export const resolveOne = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    let arrangementsSum = 0;
    let counter = 0;
    await reader.on('line', (line) => {
        let lenghts = line.split(" ")[1].split(",");
        let springs = line.split(" ")[0];

        arrangementsSum += countArrangements(springs, lenghts);
        counter++;
    });
    await events.once(reader, 'close');
      
    return "" + arrangementsSum;
}

export const resolveTwo = async (filename: string): Promise<any> => {
    
    let distanceSum = 0;
    
    
    return "" + distanceSum;
}

const countArrangements = (line: string, lengths: string[]): number => {
    let arrangements = 0;
    const numberOfQuestionMarks = countOccurrences(line, "?");
    const combinations = generateCombinations(numberOfQuestionMarks, ["#", "."]);

    combinations.forEach(combination => {
        let newLine = replaceOccurrence(line, "?", combination);
        if (isRegularArrangement(newLine, lengths)) {
            arrangements++;
        }

    });

    return arrangements;
};

const isRegularArrangement = (line: string, lenghts: string[]): boolean => {
    let regular = true;

    if (!containsOnly(line, [".", "#"])) {
        return false;
    }

    let formattedLine = removeDuplicates(line, ".");
    formattedLine = formattedLine.startsWith(".") ? formattedLine.substring(1) : formattedLine;
    formattedLine = formattedLine.endsWith(".") ? formattedLine.substring(0, formattedLine.length - 1) : formattedLine;

    let springs = formattedLine.split(".");

    if (springs.length !== lenghts.length) {
        return false;
    }

    for (let i = 0; i < springs.length; i++) {
        if (springs[i].length !== +lenghts[i]) {
            return false;
        }
    }


    return regular;
}
