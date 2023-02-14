package com.danielaciucur.textanalyzer.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class ResultNotFoundException extends RuntimeException {
    public ResultNotFoundException(){
        super("No online results found");
    }
}