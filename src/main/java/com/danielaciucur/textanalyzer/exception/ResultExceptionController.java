package com.danielaciucur.textanalyzer.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ResultExceptionController {

    @ExceptionHandler(ResultNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity handleResultsNotFoundException(ResultNotFoundException exception) {
        ErrorResponse error = new ErrorResponse(exception.getLocalizedMessage(),HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(error, error.getStatus());
    }

}