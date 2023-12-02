export const isNumeric = (val: string) : boolean => {
    return !isNaN(Number(val));
}

export const findFirstDigitalDigit = (val: string) : number => {
    const firstDigit = val.match(/\d/);
    if (firstDigit) {
        return +firstDigit[0];
    } else {
        return -1;
    }
}

export const findLastDigitalDigit = (val: string) : number => {
    const lastDigit = val.match(/\d(?=\D*$)/);
    if (lastDigit) {
        return +lastDigit[0];
    } else {
        return -1;
    }
}

const wordDigits = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const firstWordDigit = (val: string) : string | undefined => {
    let result;

    let location = -1;

    wordDigits.forEach(wordDigit => {
        const index = val.indexOf(wordDigit);
        if (index > -1 && (location === -1 || location > index)) {
            location = index;
            result = wordDigit;
        }
    });

    return result;
}

const lastWordDigit = (val: string) : string | undefined => {
    let result;

    let location = -1;

    wordDigits.forEach(wordDigit => {
        const index = val.lastIndexOf(wordDigit);
        if (index > -1 && (location === -1 || location < index)) {
            location = index;
            result = wordDigit;
        }
    });

    return result;
}

export const firstDigit = (val: string) : number => {
    const firstDigital = findFirstDigitalDigit(val);
    const firstWord = firstWordDigit(val);

    // no digital
    if (firstDigital === -1) {
        if (firstWord) {
            // has word
            return wordDigits.indexOf(firstWord) + 1;
        } else {
            // no word, too
            return -1;
        }
    }

    // has digital
    if (firstWord) {
        // has word, too
        return (val.indexOf("" + firstDigital) < val.indexOf(firstWord)) ? firstDigital : wordDigits.indexOf(firstWord) + 1;
    } else {
        // no word, but has digital
        return firstDigital;
    }
}

export const lastDigit = (val: string) : number => {
    const lastDigital = findLastDigitalDigit(val);
    const lastWord = lastWordDigit(val);

    // no digital
    if (lastDigital === -1) {
        if (lastWord) {
            // has word
            return wordDigits.indexOf(lastWord) + 1;
        } else {
            // no word, too
            return -1;
        }
    }

    // has digital
    if (lastWord) {
        // has word, too
        return (val.lastIndexOf("" + lastDigital) > val.lastIndexOf(lastWord)) ? lastDigital : wordDigits.indexOf(lastWord) + 1;
    } else {
        // no word, but has digital
        return lastDigital;
    }
}
