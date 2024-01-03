package com.catrion.backend.service.impl;

import com.catrion.backend.exception.UserAlreadyExistsException;
import com.catrion.backend.exception.UserNotFoundException;
import com.catrion.backend.model.dto.request.LoginRequestDto;
import com.catrion.backend.model.dto.request.RefreshTokenRequestDto;
import com.catrion.backend.model.dto.request.RegistrationRequestDto;
import com.catrion.backend.model.dto.response.AuthenticationResponse;
import com.catrion.backend.model.entity.User;
import com.catrion.backend.model.enums.Role;
import com.catrion.backend.repository.UserRepository;
import com.catrion.backend.service.AuthenticationService;
import com.catrion.backend.config.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Override
    public void register(RegistrationRequestDto request) {
        Optional<User> userOptional = userRepository.findByEmail(request.email());
        if (userOptional.isPresent()) {
            throw new UserAlreadyExistsException("user already exists", "user (" + request.email() + ") already exists.");
        }
        User user = User.builder()
                .firstname(request.firstName())
                .lastname(request.lastName())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
    }

    @Override
    public AuthenticationResponse authenticate(LoginRequestDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(), request.password()));
        User user = userRepository.findByEmail(request.email()).orElseThrow(
                () -> new UserNotFoundException("user not found", "user (" + request.email() + ") not found"));
        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        return new AuthenticationResponse(jwtToken, refreshToken);
    }

    @Override
    public AuthenticationResponse refreshToken(RefreshTokenRequestDto request) {
        String username = jwtService.extractUsername(request.token());
        if (username != null) {
            User user = userRepository.findByEmail(username).orElseThrow(
                    () -> new UserNotFoundException("user not found", "user (" + username + ") not found"));
            if (jwtService.isTokenValid(request.token(), user)) {
                String accessToken = jwtService.generateToken(user);
                return new AuthenticationResponse(accessToken, request.token());
            }
        }
        return null;
    }
}
