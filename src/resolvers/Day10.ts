import fs from "fs";
import readline from "readline";
import events from "events";
import { isEven, isOdd } from "../tools/Utils";
import { Maze } from "../assets/Maze";

let maze: Maze;

export const resolveOne = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    let farAway = 0;
    let pipeMaze: string[][] = [];
    await reader.on('line', (line) => {
        let row: string[] = [];
        line.split("").forEach((move, columnIndex) => {
            row.push(move);
        });
        pipeMaze.push(row);
    });
    await events.once(reader, 'close');

    maze = new Maze(pipeMaze);

    farAway = maze.markAndCountSteps() / 2;
        
    return "" + farAway;
}

export const resolveTwo = async (filename: string): Promise<any> => {
    
    let insideCount = 0;
    
    maze.massiveFloodFill();

    maze.printMaze();
        
    return "" + insideCount;
}
