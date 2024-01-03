package com.catrion.backend.controller;

import com.catrion.backend.model.dto.response.HomeResponseDto;
import com.catrion.backend.model.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/home")
@CrossOrigin
@RequiredArgsConstructor
@Slf4j
public class HomeController {

    @GetMapping
    public ResponseEntity<HomeResponseDto> home(@AuthenticationPrincipal User user) {
        log.info("logged in user {}", user.getEmail());
        return ResponseEntity.ok(
                new HomeResponseDto("Hello " + user.getEmail(),
                        user.getEmail(), user.getFirstname(), user.getLastname()));
    }
}
