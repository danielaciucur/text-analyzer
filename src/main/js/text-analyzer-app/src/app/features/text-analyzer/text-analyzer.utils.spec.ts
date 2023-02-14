import { TextInput } from './models/input.model';
import { TextAnalyzerUtils } from './text-analyzer.utils';

describe('TextAnalyzerUtils', () => {
  let textAnalyzerUtils: TextAnalyzerUtils;

  beforeEach(() => {
    textAnalyzerUtils = new TextAnalyzerUtils();
  });

  it('should create an instance of TextAnalyzerUtils', () => {
    expect(textAnalyzerUtils).toBeTruthy();
  });

  it('should return correct result analysis for vowels', () => {
    let input = new TextInput("aaa^(*&(^*&87987", true, false);
    let expectedResult = new Map<string, string[]>;
    expectedResult.set("Offline analysis: '\nYour input " + input.inputText, ["Letter 'A' appears 3 times \n"])

    expect(TextAnalyzerUtils.analyzeText(input)).toEqual(expectedResult);
  });

  it('should return correct result analysis for consonants', () => {
    let input = new TextInput("fff%*&(*&870099", false, true);
    let expectedResult = new Map<string, string[]>;
    expectedResult.set("Offline analysis: '\nYour input " + input.inputText, ["Letter 'F' appears 3 times \n"])

    expect(TextAnalyzerUtils.analyzeText(input)).toEqual(expectedResult);
  });

  it('should return correct result analysis for vowels and consonants', () => {
    let input = new TextInput("aaafff%*&(*&870099", true, true);
    let expectedResult = new Map<string, string[]>;
    expectedResult.set("Offline analysis: '\nYour input " + input.inputText, ["Letter 'A' appears 3 times \n","Letter 'F' appears 3 times \n"])

    expect(TextAnalyzerUtils.analyzeText(input)).toEqual(expectedResult);
  });

  it('should throw exception for analysis of vowels', () => {
    let input = new TextInput("aaa", false, true);

    const errorInitEvent: ErrorEventInit = {
        error : new Error('Text Analyzer'),
        message : 'No offline results found'
    };

    expect(() => {
        TextAnalyzerUtils.analyzeText(input);
      }).toThrow(new ErrorEvent('MyErrEventType', errorInitEvent));
  });
});