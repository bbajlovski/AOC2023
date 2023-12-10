import fs from "fs";
import readline from "readline";
import events from "events";
import { start } from "repl";

type Coordinates = {
    row: number,
    column: number
}

export const resolveOne = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    let farAway = 0;
    let pipeMaze: string[][] = [];
    let rowIndex = 0;
    let startingPosition: Coordinates = {row: -1, column: -1};
    await reader.on('line', (line) => {
        let row: string[] = [];
        line.split("").forEach((move, columnIndex) => {
            row.push(move);
            if (move.toUpperCase() === "S") {
                startingPosition = {row: rowIndex, column: columnIndex};
                console.log(startingPosition);
            }
        });
        pipeMaze.push(row);
        rowIndex++;
    });
    await events.once(reader, 'close');

    console.log(pipeMaze);

    let currentPosition: Coordinates = startingPosition;
    let previousPosition: Coordinates = {row: -1, column: -1} as Coordinates;
    let steps = 0;
    
    while (!(currentPosition.row === startingPosition.row && 
        currentPosition.column === startingPosition.column) || steps === 0) {
        let nextPosition = calculateNextCoordinates(currentPosition, previousPosition, pipeMaze);
        previousPosition = currentPosition;
        currentPosition = nextPosition;
        console.log(steps, currentPosition, previousPosition);
        steps++;
    }

    farAway = steps / 2
        
    return "" + farAway;
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

const calculateNextCoordinates = (currentPosition: Coordinates, previousPosition: Coordinates, maze: string[][]): Coordinates => {
    let nextCoordinates = {row: -1, column: -1};
    console.log("currentPosition", currentPosition, maze[currentPosition.row][currentPosition.column]);
    console.log("previousPosition", previousPosition, previousPosition.row > -1 ? maze[previousPosition.row][previousPosition.column] : "");

    if (maze[currentPosition.row][currentPosition.column] === "S") {
        // to the above S
        if (currentPosition.row !== 0 && 
            (maze[currentPosition.row - 1][currentPosition.column] === "7" || 
            maze[currentPosition.row - 1][currentPosition.column] === "|" ||
            maze[currentPosition.row - 1][currentPosition.column] === "F")) {
            console.log("S-UP");
            return nextCoordinates = {row: currentPosition.row - 1, column: currentPosition.column};
        }
        // to the below S
        if (currentPosition.row !== maze.length - 1 && 
            (maze[currentPosition.row + 1][currentPosition.column] === "J" || 
            maze[currentPosition.row + 1][currentPosition.column] === "|" ||
            maze[currentPosition.row + 1][currentPosition.column] === "L")) {
            console.log("S-DOWN");
            return nextCoordinates = {row: currentPosition.row + 1, column: currentPosition.column};
        }
        // to the left of S
        if (currentPosition.column !== 0 && 
            (maze[currentPosition.row][currentPosition.column - 1] === "L" || 
            maze[currentPosition.row][currentPosition.column - 1] === "-" ||
            maze[currentPosition.row][currentPosition.column - 1] === "F")) {
            console.log("S-LEFT");
            return nextCoordinates = {row: currentPosition.row, column: currentPosition.column - 1};
        }
        // to the right of S
        if (currentPosition.column !== maze[0].length - 1 && 
            (maze[currentPosition.row][currentPosition.column + 1] === "J" || 
            maze[currentPosition.row][currentPosition.column + 1] === "-" ||
            maze[currentPosition.row][currentPosition.column + 1] === "7")) {
            console.log("S-RIGHT");
            return nextCoordinates = {row: currentPosition.row, column: currentPosition.column + 1};
        }        
    }

    if (maze[currentPosition.row][currentPosition.column] === "|") {
        // to the above
        if (currentPosition.row !== 0 && 
            previousPosition.row === currentPosition.row + 1 &&
            (maze[currentPosition.row - 1][currentPosition.column] === "7" || 
            maze[currentPosition.row - 1][currentPosition.column] === "|" ||
            maze[currentPosition.row - 1][currentPosition.column] === "F" ||
            maze[currentPosition.row - 1][currentPosition.column] === "S")) {
            console.log("|-UP");
            return nextCoordinates = {row: currentPosition.row - 1, column: currentPosition.column};
        }

        // to the below
        if (currentPosition.row !== maze.length - 1 && 
            previousPosition.row === currentPosition.row - 1 &&
            (maze[currentPosition.row + 1][currentPosition.column] === "J" || 
            maze[currentPosition.row + 1][currentPosition.column] === "|" ||
            maze[currentPosition.row + 1][currentPosition.column] === "L" ||
            maze[currentPosition.row + 1][currentPosition.column] === "S")) {
            console.log("|-DOWN");
            return nextCoordinates = {row: currentPosition.row + 1, column: currentPosition.column};
        }

    }

    if (maze[currentPosition.row][currentPosition.column] === "-") {
        // to the left
        if (currentPosition.column !== 0 && 
            previousPosition.column === currentPosition.column + 1 &&
            (maze[currentPosition.row][currentPosition.column - 1] === "L" || 
            maze[currentPosition.row][currentPosition.column - 1] === "-" ||
            maze[currentPosition.row][currentPosition.column - 1] === "F" ||
            maze[currentPosition.row][currentPosition.column - 1] === "S")) {
            console.log("-LEFT");
            return nextCoordinates = {row: currentPosition.row, column: currentPosition.column - 1};
        }
        // to the right
        if (currentPosition.column !== maze[0].length - 1 && 
            previousPosition.column === currentPosition.column - 1 &&
            (maze[currentPosition.row][currentPosition.column + 1] === "J" || 
            maze[currentPosition.row][currentPosition.column + 1] === "-" ||
            maze[currentPosition.row][currentPosition.column + 1] === "7" ||
            maze[currentPosition.row][currentPosition.column + 1] === "S")) {
            console.log("-RIGHT");
            return nextCoordinates = {row: currentPosition.row, column: currentPosition.column + 1};
        }
    }

    if (maze[currentPosition.row][currentPosition.column] === "L") {
        // to the above
        if (currentPosition.row !== 0 && 
            previousPosition.column === currentPosition.column + 1 &&
            (maze[currentPosition.row - 1][currentPosition.column] === "7" || 
            maze[currentPosition.row - 1][currentPosition.column] === "|" ||
            maze[currentPosition.row - 1][currentPosition.column] === "F" ||
            maze[currentPosition.row - 1][currentPosition.column] === "S")) {
            console.log("L-UP");
            return nextCoordinates = {row: currentPosition.row - 1, column: currentPosition.column};
        }
        // to the right
        if (currentPosition.column !== maze[0].length - 1 && 
            previousPosition.row === currentPosition.row - 1 &&
            (maze[currentPosition.row][currentPosition.column + 1] === "J" || 
            maze[currentPosition.row][currentPosition.column + 1] === "-" ||
            maze[currentPosition.row][currentPosition.column + 1] === "7")) {
            console.log("L-RIGHT");
            return nextCoordinates = {row: currentPosition.row, column: currentPosition.column + 1};
        }
    }

    if (maze[currentPosition.row][currentPosition.column] === "J") {
        // to the above
        if (currentPosition.row !== 0 && 
            previousPosition.column === currentPosition.column - 1 &&
            (maze[currentPosition.row - 1][currentPosition.column] === "7" || 
            maze[currentPosition.row - 1][currentPosition.column] === "|" ||
            maze[currentPosition.row - 1][currentPosition.column] === "F" ||
            maze[currentPosition.row - 1][currentPosition.column] === "S")) {
            console.log("J-UP");
            return nextCoordinates = {row: currentPosition.row - 1, column: currentPosition.column};
        }
        // to the left
        if (currentPosition.column !== 0 && 
            previousPosition.row === currentPosition.row - 1 &&
            (maze[currentPosition.row][currentPosition.column - 1] === "L" || 
            maze[currentPosition.row][currentPosition.column - 1] === "-" ||
            maze[currentPosition.row][currentPosition.column - 1] === "F" ||
            maze[currentPosition.row][currentPosition.column - 1] === "S")) {
            console.log("J-LEFT");
            return nextCoordinates = {row: currentPosition.row, column: currentPosition.column - 1};
        }        
    }

    if (maze[currentPosition.row][currentPosition.column] === "F") {
        // to the below
        if (currentPosition.row !== maze.length - 1 && 
            previousPosition.column === currentPosition.column + 1 &&
            (maze[currentPosition.row + 1][currentPosition.column] === "J" || 
            maze[currentPosition.row + 1][currentPosition.column] === "|" ||
            maze[currentPosition.row + 1][currentPosition.column] === "L" ||
            maze[currentPosition.row + 1][currentPosition.column] === "S")) {
            console.log("F-DOWN");
            return nextCoordinates = {row: currentPosition.row + 1, column: currentPosition.column};
        }
        // to the right
        if (currentPosition.column !== maze[0].length - 1 && 
            previousPosition.row === currentPosition.row + 1 &&
            (maze[currentPosition.row][currentPosition.column + 1] === "J" || 
            maze[currentPosition.row][currentPosition.column + 1] === "-" ||
            maze[currentPosition.row][currentPosition.column + 1] === "7" ||
            maze[currentPosition.row][currentPosition.column + 1] === "S")) {
            console.log("F-RIGHT");
            return nextCoordinates = {row: currentPosition.row, column: currentPosition.column + 1};
        }
    }

    if (maze[currentPosition.row][currentPosition.column] === "7") {
        // to the below
        if (currentPosition.row !== maze.length - 1 && 
            previousPosition.column === currentPosition.column - 1 &&
            (maze[currentPosition.row + 1][currentPosition.column] === "J" || 
            maze[currentPosition.row + 1][currentPosition.column] === "|" ||
            maze[currentPosition.row + 1][currentPosition.column] === "L" ||
            maze[currentPosition.row + 1][currentPosition.column] === "S")) {
            console.log("7-DOWN");
            return nextCoordinates = {row: currentPosition.row + 1, column: currentPosition.column};
        }
        // to the left
        if (currentPosition.column !== 0 && 
            previousPosition.row === currentPosition.row + 1 &&
            (maze[currentPosition.row][currentPosition.column - 1] === "L" || 
            maze[currentPosition.row][currentPosition.column - 1] === "-" ||
            maze[currentPosition.row][currentPosition.column - 1] === "F" ||
            maze[currentPosition.row][currentPosition.column - 1] === "S")) {
            console.log("7-LEFT");
            return nextCoordinates = {row: currentPosition.row, column: currentPosition.column - 1};
        }
    }

    return nextCoordinates;
}
