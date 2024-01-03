package com.catrion.backend.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequestDto(
        @NotBlank(message = "email should not be empty")
        @Email(message = "email should be in valid format")
        String email,
        @NotBlank(message = "password should not be empty")
        String password) {
}
