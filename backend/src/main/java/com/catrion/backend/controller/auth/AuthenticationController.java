package com.catrion.backend.controller.auth;

import com.catrion.backend.model.dto.request.LoginRequestDto;
import com.catrion.backend.model.dto.request.RefreshTokenRequestDto;
import com.catrion.backend.model.dto.request.RegistrationRequestDto;
import com.catrion.backend.model.dto.response.AuthenticationResponse;
import com.catrion.backend.model.dto.response.RegistrationResponseDto;
import com.catrion.backend.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponseDto> register(
            @RequestBody @Validated RegistrationRequestDto request) {
        log.info("register with email {}", request.email());
        authenticationService.register(request);
        return ResponseEntity.ok(
                new RegistrationResponseDto("user registered successfully", request.email()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody LoginRequestDto request) {
        log.info("login with email {}", request.email());
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> refreshToken(@RequestBody RefreshTokenRequestDto request) {
        return ResponseEntity.ok(authenticationService.refreshToken(request));
    }

}
