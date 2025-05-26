
package com.planner.backend.service;

import com.planner.backend.dto.SignupRequestDto;
import com.planner.backend.entity.User;
import com.planner.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public void signup(SignupRequestDto dto) {
        User user = new User(dto.getAccountId(), dto.getEmail(), dto.getPassword());
        userRepository.save(user);
    }
}
