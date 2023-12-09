import fs from "fs";
import readline from "readline";
import events from "events";

export const resolveOne = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    let sum = 0;
    await reader.on('line', (line) => {
        const nextMember = extrapolateNextMember(line.split(" ").map(val => +val));
        sum += nextMember;
    });
    await events.once(reader, 'close');    

    return "" + sum;
}

export const resolveTwo = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    let sum = 0;
    await reader.on('line', (line) => {
        const previousMember = extrapolatePreviousMember(line.split(" ").map(val => +val));
        sum += previousMember;        
    });
    await events.once(reader, 'close');    

    return "" + sum;
}

const extrapolateNextMember = (members: number[]): number => {
    if (members.every(member => member === 0)) {
        return 0;
    } else {
        const newMembers: number[] = [];
        members.forEach( (member, index) => {
            if (index > 0) {
                newMembers.push(member - members[index - 1]);
            }
        });
        return extrapolateNextMember(newMembers) + members[members.length - 1];
    }
}

const extrapolatePreviousMember = (members: number[]): number => {
    if (members.every(member => member === 0)) {
        return 0;
    } else {
        const newMembers: number[] = [];
        members.forEach( (member, index) => {
            if (index > 0) {
                newMembers.push(member - members[index - 1]);
            }
        });
        return members[0] - extrapolatePreviousMember(newMembers);
    }
}

