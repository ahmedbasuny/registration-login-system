package com.catrion.backend.service;

import com.catrion.backend.model.dto.request.LoginRequestDto;
import com.catrion.backend.model.dto.request.RefreshTokenRequestDto;
import com.catrion.backend.model.dto.request.RegistrationRequestDto;
import com.catrion.backend.model.dto.response.AuthenticationResponse;

public interface AuthenticationService {

    void register(RegistrationRequestDto request);

    AuthenticationResponse authenticate(LoginRequestDto request);

    AuthenticationResponse refreshToken(RefreshTokenRequestDto request);
}
