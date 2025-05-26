package com.planner.backend.controller;

import com.planner.backend.dto.LoginRequestDto;
import com.planner.backend.dto.SignupRequestDto;
import com.planner.backend.entity.User;
import com.planner.backend.repository.UserRepository;
import com.planner.backend.security.JwtTokenProvider;
import com.planner.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequestDto dto) {
        userService.signup(dto);
        return ResponseEntity.ok("회원가입 완료");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDto request) {
        User user = userRepository.findByAccountId(request.getAccountId())
                .orElseThrow(() -> new RuntimeException("가입된 사용자가 없습니다"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다");
        }

        String token = jwtTokenProvider.createToken(user.getAccountId());
        return ResponseEntity.ok(token);
    }

}
