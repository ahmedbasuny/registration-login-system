package com.catrion.backend.exception;

import lombok.Data;

@Data
public class UserAlreadyExistsException extends RuntimeException {
	private final String message;
	private final String details;
}
