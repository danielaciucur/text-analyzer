package com.danielaciucur.textanalyzer.services;

import com.danielaciucur.textanalyzer.exception.ResultNotFoundException;
import com.danielaciucur.textanalyzer.model.TextInput;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TextAnalyzerService {

    public static final Character[] VOWELS = {'A', 'E', 'I', 'O', 'U'};

    public Map<String, ArrayList<String>> analyzeText(TextInput input) {
        ArrayList<String> result = new ArrayList<>();
        HashMap<String, ArrayList<String>> map = new HashMap<>();

        String newInput =
                input.inputText.replaceAll("[^a-zA-Z]", "");

        newInput = newInput.replace(" ", "");
        if (input.checkVowels && input.checkConsonants) {
            result.addAll(checkForVowels(newInput));
            result.addAll(checkForConsonants(newInput));
        } else {
            if (input.checkVowels) {
                result.addAll(checkForVowels(newInput));
            } else {
                result.addAll(checkForConsonants(newInput));
            }
        }

        if (result.isEmpty()) {
            throw new ResultNotFoundException();
        } else {
            map.put("Online Analysis: \nYour input:" + input.inputText, result);
        }

        return map;
    }

    public ArrayList<String> checkForVowels(String text) {
        LinkedHashMap<Character, Integer> hMap = new LinkedHashMap<>();

        for (Character vowel : VOWELS) {
            hMap.put(vowel, 0);
        }

        for (int i = 0; i <= text.length() - 1; i++) {
            Character upperCaseCh = Character.toUpperCase(text.charAt(i));
            if (hMap.containsKey(upperCaseCh)) {
                int count = hMap.get(upperCaseCh);
                hMap.put(upperCaseCh, ++count);
            }
        }

        return this.getAnalysisText(hMap);
    }

    public ArrayList<String> checkForConsonants(String text) {
        LinkedHashMap<Character, Integer> consonants = new LinkedHashMap<>();

        for (int i = 0; i <= text.length() - 1; i++) {
            Character upperCaseCh = Character.toUpperCase(text.charAt(i));
            if (this.isConsonant(upperCaseCh)) {
                if (consonants.containsKey(upperCaseCh)) {
                    int num = consonants.get(upperCaseCh);
                    num++;
                    consonants.put(upperCaseCh, num);
                } else {
                    consonants.put(upperCaseCh, 1);
                }
            }
        }
        return this.getAnalysisText(consonants);
    }

    public Boolean isConsonant(Character ch) {
        return !Arrays.asList(VOWELS).contains(ch);
    }

    public ArrayList<String> getAnalysisText(Map<Character, Integer> map) {
        ArrayList<String> result = new ArrayList<>();

        for (Map.Entry<Character, Integer> entry : map.entrySet()) {
                if (entry.getValue() > 0) {
                    String[] analysisWords = {"Letter", "'" + entry.getKey().toString() + "'", "appears", entry.getValue().toString(), this.getSentencePlural(entry.getValue()), "\n"};
                    String analysisResult = String.join(" ", analysisWords);
                    result.add(analysisResult);
                }
        }

        return result;
    }

    public String getSentencePlural(int times) {
        return (times == 1) ? "time" : "times";
    }
}
