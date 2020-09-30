export function romanToString(val: number): string {

    const roman = [
        { symbol: 'm', number: 1000000 },
        { symbol: 'd', number: 500000 },
        { symbol: 'c', number: 100000 },
        { symbol: 'l', number: 50000 },
        { symbol: 'x', number: 10000 },
        { symbol: 'v', number: 5000 },
        { symbol: 'M', number: 1000 },
        { symbol: 'D', number: 500 },
        { symbol: 'C', number: 100 },
        { symbol: 'L', number: 50 },
        { symbol: 'X', number: 10 },
        { symbol: 'V', number: 5 },
        { symbol: 'I', number: 1 }
    ];

    var negative: boolean = (val < 0.0);
    if (negative) val = -val;
    var integer: number = Math.floor(val);
    if (integer == 0) return "nihil";
    var sText: string = "";
    if (negative) sText += "minus ";
    if (integer > 10000000 || integer > 80 * roman[0].number)
        return "Sorry, number is too big for Roman Numerals";

    for (var iDigit = 0; iDigit < roman.length; iDigit++) {
        var n = Math.floor(integer / roman[iDigit].number);
        integer = integer % roman[iDigit].number;
        for (var i = 1; i <= n; i++) sText += roman[iDigit].symbol;
        if (iDigit % 2 == 0 && iDigit + 2 < roman.length && Math.floor(integer / (roman[iDigit + 2].number * 9)) > 0) {
            sText += roman[iDigit + 2].symbol;
            sText += roman[iDigit].symbol;
            integer -= roman[iDigit + 2].number * 9;
        }
        if (iDigit + 1 < roman.length && Math.floor(integer / (roman[iDigit + 1].number * 4)) > 0) {
            sText += roman[iDigit + 1].symbol;
            sText += roman[iDigit].symbol;
            integer -= roman[iDigit + 1].number * 4;
        }
    }
    return sText;
}