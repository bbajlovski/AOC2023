type Step =  
    "seed-to-soil" | 
    "soil-to-fertilizer" | 
    "fertilizer-to-water" | 
    "water-to-light" | 
    "light-to-temperature" |
    "temperature-to-humidity" |
    "humidity-to-location" |
    undefined;

export class Garden {
    
    private process: {processType: Step, destination: number, source: number, range: number}[];

    constructor(lines: string[]) {
        this.process = [];
        let processType : Step = undefined;
        lines.forEach(line => {
            if (line.indexOf(" map:") > -1) {
                processType = line.split(" ")[0] as Step;
            } else {

                let params = line.split(" ");
                let step = {
                    processType: processType,
                    destination: +params[0],
                    source: +params[1],
                    range: +params[2]
                }
                this.process.push(step);
            }
        });
    }

    public getLocation = (seed: number) => {
        let location = -1;
        let transfer = seed;

        const steps: Step[] = ["seed-to-soil", "soil-to-fertilizer", "fertilizer-to-water", "water-to-light", "light-to-temperature", "temperature-to-humidity", "humidity-to-location"];

        steps.forEach(step => {
            let stop = false;
            this.process.forEach(processStep => {
                if (!stop && 
                    processStep.processType === step && 
                    processStep.source <= transfer && transfer <= processStep.source + processStep.range - 1) {
                    transfer = processStep.destination + (transfer - processStep.source);
                    stop = true;
                }
            });
        });

        location = transfer;
        return location;
    }
}