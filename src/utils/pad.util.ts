export const Pad = (val: number, char: string, len = 7): string => {
    let str = '';
    for (let index = val.toString().length; index < len; index++) {
        str += char;
    }
    return str+val;
};