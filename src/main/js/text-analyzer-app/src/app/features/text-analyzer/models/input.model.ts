export class TextInput {
    inputText: string;
    checkVowels: boolean;
    checkConsonants: boolean;

    constructor(inputText: string, checkVowels: boolean, checkConsonants: boolean) {
        this.inputText = inputText;
        this.checkVowels = checkVowels;
        this.checkConsonants = checkConsonants;
    }
}