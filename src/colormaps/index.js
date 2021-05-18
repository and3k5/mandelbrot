export function Default(i,maxIteration) {
    const scale = ((i / maxIteration) * 255) & 255;
    return [scale, scale, scale];
}

export function Colored(i, maxIteration) {
    const result = [0, 0, 0];

    if (i != maxIteration) {
        const c = 3 * Math.log(i) / Math.log(maxIteration - 1.0);
        if (c < 1) {
            result[0] = 255 * c;
            return result;
        }
        result[0] = 255;
        result[1] = 255;
        if (c < 2) {
            result[1] *= c - 1;
        } else {
            result[2] = 255 * (c - 2);
        }
        return result;
    }
    return result;
};

export const all = [{ name: "Colored", fnc: Colored }, { name: "Default", fnc: Default }];

export function getColorMapByName(name) {
    return all.filter(cm => cm.name == name)[0].fnc;
}