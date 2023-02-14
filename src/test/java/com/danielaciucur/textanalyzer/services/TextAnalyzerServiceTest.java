package com.danielaciucur.textanalyzer.services;

import com.danielaciucur.textanalyzer.exception.ResultNotFoundException;
import com.danielaciucur.textanalyzer.model.TextInput;
import com.google.common.collect.MapDifference;
import com.google.common.collect.Maps;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
public class TextAnalyzerServiceTest {

    @TestConfiguration
    static class TextAnalyzerServiceTestContextConfiguration {
        @Bean
        public TextAnalyzerService textAnalyzerService() {
            return new TextAnalyzerService();
        }
    }

    @Autowired
    private TextAnalyzerService textAnalyzerService;

    @DisplayName("JUnit test for analyze vowels in a text")
    @Test
    public void analyzeTest_With_Vowel_Input_Should_Return_Success() {
        // Arrange
        ArrayList<String> result = new ArrayList<>();
        result.add("Letter 'E' appears 3 times \n");

        TextInput input = new TextInput("eee%&)((*&", true, false);
        Map<String, ArrayList<String>> expectedValues = new HashMap<>();
        expectedValues.put("Online Analysis: \nYour input:" + input.inputText, result);

        // Act
        Map<String, ArrayList<String>> actualValues = textAnalyzerService.analyzeText(input);

        // Assert
        assertEquals(expectedValues, actualValues);
    }

    @DisplayName("JUnit test for analyze consonants in a text")
    @Test
    public void analyzeTest_With_Consonant_Input_Should_Return_Success() {
        // Arrange
        ArrayList<String> result = new ArrayList<>();
        result.add("Letter 'F' appears 3 times \n");

        TextInput input = new TextInput("fff(*&_)^666", false, true);
        Map<String, ArrayList<String>> expectedValues = new HashMap<>();
        expectedValues.put("Online Analysis: \nYour input:" + input.inputText, result);

        // Act
        Map<String, ArrayList<String>> actualValues = textAnalyzerService.analyzeText(input);

        // Assert
        assertEquals(expectedValues, actualValues);
    }

    @DisplayName("JUnit test for analyze vowels and consonants in a text")
    @Test
    public void analyzeTest_With_Vowels_And_Consonant_Input_Should_Return_Success() {
        // Arrange
        ArrayList<String> result = new ArrayList<>();
        result.add("Letter 'A' appears 3 times \n, Letter 'F' appears 3 times \n");

        TextInput input = new TextInput("fffaaa%(&^(&6707", true, true);
        Map<String, ArrayList<String>> expectedValues = new HashMap<>();
        expectedValues.put("Online Analysis: \nYour input:" + input.inputText, result);

        // Act
        Map<String, ArrayList<String>> actualValues = textAnalyzerService.analyzeText(input);

        // Assert
        MapDifference<String, ArrayList<String>> diff = Maps.difference(expectedValues, actualValues);
        assertFalse(diff.areEqual());
    }

    @DisplayName("JUnit test throws exception with input vowels and check consonants true")
    @Test
    public void analyzeTest_With_Vowels_Input_And_Check_Consonants_True_Should_Throws_Exception() {
        // Arrange
        TextInput input = new TextInput("aaa", false, true);

        ResultNotFoundException exception = assertThrows(ResultNotFoundException.class,
                () -> textAnalyzerService.analyzeText(input));

        assertEquals("No online results found", exception.getMessage());
    }

    @DisplayName("JUnit test throws exception with input consonants and check vowels true")
    @Test
    public void analyzeTest_With_Consonants_Input_And_Check_Vowels_True_Should_Throws_Exception() {
        // Arrange
        TextInput input = new TextInput("fff", true, false);

        ResultNotFoundException exception = assertThrows(ResultNotFoundException.class,
                () -> textAnalyzerService.analyzeText(input));

        assertEquals("No online results found", exception.getMessage());
    }

    @DisplayName("JUnit test throws exception with non alphabetic input")
    @Test
    public void analyzeTest_With_Non_Alphabetic_Input_Should_Throws_Exception() {
        // Arrange
        TextInput input = new TextInput("3333333", true, false);

        ResultNotFoundException exception = assertThrows(ResultNotFoundException.class,
                () -> textAnalyzerService.analyzeText(input));

        assertEquals("No online results found", exception.getMessage());
    }

    @DisplayName("JUnit test throws exception with non alphabetic input")
    @Test
    public void analyzeTest_With_Symbolic_Input_Should_Throws_Exception() {
        // Arrange
        TextInput input = new TextInput("%&*^(&%&^%*&^(&*", true, false);

        ResultNotFoundException exception = assertThrows(ResultNotFoundException.class,
                () -> textAnalyzerService.analyzeText(input));

        assertEquals("No online results found", exception.getMessage());
    }

}
