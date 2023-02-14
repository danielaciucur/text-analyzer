package com.danielaciucur.textanalyzer.controllers;

import com.danielaciucur.textanalyzer.model.TextInput;
import com.danielaciucur.textanalyzer.services.TextAnalyzerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Map;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TextAnalyzerController {

    @Autowired
    TextAnalyzerService textAnalyzerService;

    @PostMapping("/analyze-text")
    public Map<String, ArrayList<String>> getAnalyzedText(@RequestBody TextInput input) {
        return textAnalyzerService.analyzeText(input);
    }
}
