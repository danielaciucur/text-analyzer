package com.danielaciucur.textanalyzer.controllers;

import com.danielaciucur.textanalyzer.exception.ResultNotFoundException;
import com.danielaciucur.textanalyzer.model.TextInput;
import com.danielaciucur.textanalyzer.services.TextAnalyzerService;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultMatcher;


import static org.assertj.core.api.FactoryBasedNavigableListAssert.assertThat;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.Matchers.instanceOf;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;


import java.util.*;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(TextAnalyzerController.class)
public class TextAnalyzerControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private TextAnalyzerService textAnalyzerService;

    @Test
    public void analyzeTest_With_Vowel_Input_Should_Return_Success() throws Exception {
        ArrayList<String> result = new ArrayList<>();
        result.add("Letter 'E' appears 3 times \n");
        TextInput input = new TextInput("eee%&)((*&", true, false);

        Map<String, ArrayList<String>> expectedValues = new HashMap<>();
        expectedValues.put("Online Analysis: \nYour input:" + input.inputText, result);
        given(textAnalyzerService.analyzeText(any())).willReturn(expectedValues);

        mvc.perform(post("/analyze-text")
                .contentType(APPLICATION_JSON)
                .content(JsonUtil.toJson(input)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(expectedValues));
    }

}
