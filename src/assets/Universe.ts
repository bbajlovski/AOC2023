export class Universe {

    originalGalaxies: string[][];
    galaxies: string[][];

    constructor(universe: string[][]) {
        this.originalGalaxies = universe;
        this.galaxies = this.clone(universe);
    }

    isEmptyColumn = (columnIndex: number, galaxies: string[][]): boolean => {
        let isEmpty = true;
        galaxies.forEach(row => {
            if (row[columnIndex] !== ".") {
                isEmpty = false;
            }
        });
        return isEmpty;
    }

    isEmptyRow = (rowIndex: number, galaxies: string[][]): boolean => {

        let isEmpty = true;
        galaxies[rowIndex].forEach(field => {
            if (field !== ".") {
                isEmpty = false;
            }
        });
        return isEmpty;
    }

    addColumn = (columnIndex: number, galaxies: string[][]) => {
        galaxies.forEach(row => {
            row.splice(columnIndex, 0, ".");
        });
    }

    addRow = (rowIndex: number, galaxies: string[][]) => {
        let newRow: string[] = [];
        galaxies[0].forEach(field => {
            newRow.push(".");
        });
        galaxies.splice(rowIndex, 0, newRow);
    }

    public expandUniverse = () => {
        let expandedGalaxies = this.clone(this.galaxies);

        let offset = 0;
        this.galaxies.forEach((row, rowIndex) => {
            if (this.isEmptyRow(rowIndex, this.galaxies)) {
                this.addRow(rowIndex + offset, expandedGalaxies);
                offset++;
            }
        });

        offset = 0;
        this.galaxies[0].forEach((field, columnIndex) => {
            if (this.isEmptyColumn(columnIndex, this.galaxies)) {
                this.addColumn(columnIndex + offset, expandedGalaxies);
                offset++;
            }
        });

        this.galaxies = expandedGalaxies;
    }

    clone = (oldGalaxies: string[][]): string[][] => {
        let newGalaxies: string[][] = [];
        oldGalaxies.forEach((row, rowIndex) => {
            let newRow: string[] = [];
            row.forEach((field, columnIndex) => {
                newRow.push(field);
            });
            newGalaxies.push(newRow);
        });
        return newGalaxies;
    }

    calculateDistance = (galaxyOne: {rowIndex: number, columnIndex: number}, galaxyTwo: {rowIndex: number, columnIndex: number}): number => {
        return Math.abs(galaxyOne.rowIndex - galaxyTwo.rowIndex) + Math.abs(galaxyOne.columnIndex - galaxyTwo.columnIndex);
    }

    public sumDistances = (): number => {
        let sum = 0;
        let galaxies = this.galaxies;

        galaxies.forEach((row, rowIndex) => {
            galaxies[rowIndex].forEach((field, columnIndex) => {
                if (field === "#") {
                    for (let destinationRowIndex = rowIndex; destinationRowIndex < galaxies.length; destinationRowIndex++) {
                        for (let destinationColumnIndex = 0; destinationColumnIndex < row.length; destinationColumnIndex++) {
                            if (destinationRowIndex === rowIndex && destinationColumnIndex > columnIndex || destinationRowIndex > rowIndex) {
                                if (galaxies[destinationRowIndex][destinationColumnIndex] === "#") {
                                    let distance = this.calculateDistance({rowIndex: rowIndex, columnIndex: columnIndex}, {rowIndex: destinationRowIndex, columnIndex: destinationColumnIndex});
                                    sum += distance;
                                }
                            }
                        }
                    }
                }
            });
        });

        return sum;
    }


    public print = () => {
        this.galaxies.forEach(row => {
            row.forEach(field => {
                process.stdout.write(field + " ");
            });
            process.stdout.write("\n");
        });
    }
}