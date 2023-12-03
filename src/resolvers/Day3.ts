import fs from "fs";
import readline from "readline";
import events from "events";
import { isDigit } from "../tools/Utils";


   
export const resolveOne = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    let partsSum = 0;
    let lines: string[] = [];
    await reader.on('line', (line) => {
        lines.push(line);   
    });
    await events.once(reader, 'close');
    let rowIndex = 0;
    lines.forEach(line => {
        let symbols = line.split("");
        let columnIndex = 0;
        let numberStartIndex = -1;
        let numberEndIndex = -1;
        let partNumber = "";
        symbols.forEach((symbol) => {
            if (isDigit(symbol)) {
                if (numberStartIndex === -1) {
                    numberStartIndex = columnIndex;
                }
                partNumber += symbol;
            }
            if (!isDigit(symbol) && numberStartIndex > -1) {
                numberEndIndex = columnIndex - 1;
                const adjacent = isSymbolAdjacent(lines, numberStartIndex, numberEndIndex, rowIndex);
                partsSum += adjacent ? +partNumber : 0;
                numberStartIndex = -1;
                numberEndIndex = -1;
                partNumber = "";
            }

            if (columnIndex === symbols.length - 1 && numberStartIndex > -1) {
                numberEndIndex = columnIndex;
                const adjacent = isSymbolAdjacent(lines, numberStartIndex, numberEndIndex, rowIndex);
                partsSum += adjacent ? +partNumber : 0;
                numberStartIndex = -1;
                numberEndIndex = -1;
                partNumber = "";
            }

            columnIndex++;
        }); 
        rowIndex++;
    });  

    

    return "" + partsSum;
}

export const resolveTwo = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });
1
    let sum = 0;  
    reader.on('line', (line) => {
        sum = 0;
    });

    await events.once(reader, 'close');

    return "" + sum;
}

const isSymbolAdjacent = (lines: string[], numberStartIndex: number, numberEndIndex: number, rowIndex: number) : boolean => {
    let result = false;

    for (let row = rowIndex - 1; row <= rowIndex + 1; row++) {
        if (row >=0 && row < lines.length) {
            let symbols = lines[row].split("");
            for (let column = numberStartIndex - 1; column <= numberEndIndex + 1; column++) {
                if (column >= 0 && column < symbols.length) {
                    if (!isDigit(symbols[column]) &&
                        symbols[column] !== ".") {
                            return result = true;
                    }
                }
            }
        }        
    }

    return result;
}
