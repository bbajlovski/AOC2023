export const isNumeric = (val: string) : boolean => {
    return !isNaN(Number(val));
}

export const findFirstDigit = (val: string) : number => {
    const firstDigit = val.match(/\d/);
    if (firstDigit) {
        return +firstDigit[0];
    } else {
        return 0;
    }
}

export const findLastDigit = (val: string) : number => {
    const lastDigit = val.match(/\d(?=\D*$)/);
    if (lastDigit) {
        return +lastDigit[0];
    } else {
        return 0;
    }
}