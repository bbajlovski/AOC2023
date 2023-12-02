import fs from "fs";
import readline from "readline";
import events from "events";


   
export const resolveOne = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    let gameSum = 0;  
    reader.on('line', (line) => {
        const round = line.split(":");
        const id = round[0].split(" ")[1];
        const sets = round[1].trim().split(";");
        let possible = true;
        sets.forEach(set => {
            const cubes = set.trim().split(",");
            cubes.forEach(cube => {
                const params = cube.trim().split(" ");
                const load = +params[0];
                const color = params[1];
                

                if (color === "red" && load > 12 || 
                    color === "green" && load > 13 ||
                    color === "blue" && load > 14) {
                    
                        possible = false;
                }
            });
        });

        if (possible) {
            gameSum += +id;
        }     
    });

    await events.once(reader, 'close');

    return "" + gameSum;
}

export const resolveTwo = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });
1
    let powerSum = 0;  
    reader.on('line', (line) => {
        const round = line.split(":");
        const sets = round[1].trim().split(";");
        let bag = [0, 0, 0];
        sets.forEach(set => {
            const cubes = set.trim().split(",");
            cubes.forEach(cube => {
                const params = cube.trim().split(" ");
                const load = +params[0];
                const color = params[1];
                
                if (color === "red") {
                    bag[0] = Math.max(bag[0], load);
                }

                if (color === "green") {
                    bag[1] = Math.max(bag[1], load);
                }

                if (color === "blue") {
                    bag[2] = Math.max(bag[2], load);
                }
            });
        });

        powerSum += (bag[0] * bag[1] * bag[2]);
    });

    await events.once(reader, 'close');

    return "" + powerSum;
}
