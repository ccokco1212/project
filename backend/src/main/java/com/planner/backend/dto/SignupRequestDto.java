package com.planner.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class SignupRequestDto {
    private String accountId;
    private String email;
    private String password;

    public String getAccountId() {
        return accountId;
    }
}
