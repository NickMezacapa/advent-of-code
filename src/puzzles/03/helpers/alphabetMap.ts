/* istanbul ignore file */
export const alphabetMap = new Map<string, number>();
const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
for (let i = 0; i < alphabet.length; i++) {
    alphabetMap.set(alphabet[i], i + 1);
}

export default alphabetMap;
