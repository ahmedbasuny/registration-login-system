package com.catrion.backend.exception;

import lombok.Data;

@Data
public class UserNotFoundException extends RuntimeException {
	private final String message;
	private final String details;
}
