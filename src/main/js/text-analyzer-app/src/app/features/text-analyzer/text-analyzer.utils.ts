import { TextInput } from './models/input.model';

export class TextAnalyzerUtils {

  public static VOWELS = ['A', 'E', 'I', 'O', 'U'];

  public static analyzeText(input: TextInput): Map<string, string[]> {
    let merge = [];
    let map = new Map();

    let newInput = input.inputText.replace(/[^a-zA-Z]/g, "");
    newInput = newInput.replace(" ", "");

    if (input.checkVowels && input.checkConsonants) {
        merge = merge.concat(this.checkForVowels(newInput), this.checkForConsonants(newInput));
    } else {
       merge = input.checkVowels ? merge.concat(this.checkForVowels(newInput)) : 
        merge.concat(this.checkForConsonants(newInput));
    }

    if (merge.length == 0) {

      const errorInitEvent: ErrorEventInit = {
        error : new Error('Text Analyzer'),
        message : 'No offline results found'
    };
      throw new ErrorEvent('MyErrEventType', errorInitEvent);
    } else {
      map.set("Offline analysis: '\nYour input " + input.inputText, merge);
    }

    return map;
  }

  public static checkForVowels(text: string): string[] {
    let map = new Map<string, number>();

    for (let vowel of this.VOWELS) {
      map.set(vowel, 0);
    }

    for (let i = 0; i <= text.length - 1; i++) {
      let upperCaseCh = text.charAt(i).toUpperCase();
      if (map.has(upperCaseCh)) {
        let count = map.get(upperCaseCh);
        map.set(upperCaseCh, ++count);
      }
    }

    return this.getAnalysisText(map);
  }

  public static checkForConsonants(text: string): string[] {
    let consonants = new Map<string, number>();

    for (let i = 0; i <= text.length - 1; i++) {
      let upperCaseCh = text.charAt(i).toUpperCase();
      if (this.isConsonant(upperCaseCh)) {
        if (consonants.has(upperCaseCh)) {
          let num = consonants.get(upperCaseCh);
          num++;
          consonants.set(upperCaseCh, num);
        } else {
          consonants.set(upperCaseCh, 1);
        }
      }
    }
    return this.getAnalysisText(consonants);
  }

  public static isConsonant(ch: string): boolean {
    return !this.VOWELS.includes(ch.toUpperCase());
  }

  public static getAnalysisText(map: Map<string, number>): string[] {
    let resultList = [];
    map.forEach((value: number, key: string) => {
      if (value > 0) {
        let analysisWords = [
          "Letter",
          "'" + key + "'",
          "appears",
          value,
          (value == 1 ? "time" : "times"), "\n"
        ];
        let analysisResult = analysisWords.join(" ");
        resultList.push(analysisResult);
      }
    });

    return resultList;
  }
}
