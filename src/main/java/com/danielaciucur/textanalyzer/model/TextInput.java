package com.danielaciucur.textanalyzer.model;

public class TextInput {
    public String inputText;
    public Boolean checkVowels;
    public Boolean checkConsonants;

    public TextInput(String inputText, Boolean checkVowels, Boolean checkConsonants) {
        this.inputText = inputText;
        this.checkVowels = checkVowels;
        this.checkConsonants = checkConsonants;
    }
}
