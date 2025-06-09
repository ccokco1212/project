package com.planner.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleRequestDto {
    private String title; // 도시
    private List<PlaceDto> places;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PlaceDto {
        private String name;
        private String address;
        private String phone;
        private String timeSlot;
    }
}
