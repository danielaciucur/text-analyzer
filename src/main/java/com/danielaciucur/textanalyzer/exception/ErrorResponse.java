package com.danielaciucur.textanalyzer.exception;
import org.springframework.http.HttpStatus;

public class ErrorResponse {

    private final String message;
    private final HttpStatus status;

    public String getMessage() {
        return message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public ErrorResponse(String message, HttpStatus status) {
        this.message = message;
        this.status = status;
    }
}
