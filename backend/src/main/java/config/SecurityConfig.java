package com.planner.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers(
                                "/swagger-ui/**",              // Swagger UI 정적 리소스
                                "/v3/api-docs/**",             // Swagger JSON 문서
                                "/swagger-resources/**",       // Swagger 리소스
                                "/webjars/**",                 // Swagger 필요한 JS/CSS
                                "/swagger-ui.html",            // Swagger 메인
                                "/api/users/signup",           // 회원가입
                                "/api/users/login"             // 로그인
                        ).permitAll()
                        .anyRequest().authenticated()        // 그 외는 인증 필요
                );
        return http.build();
    }
}
