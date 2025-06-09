package com.planner.backend.controller;

import com.planner.backend.dto.ScheduleRequestDto;
import com.planner.backend.entity.Schedule;
import com.planner.backend.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedules")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    @PostMapping
    public Schedule createSchedule(@RequestBody ScheduleRequestDto dto,
                                   @AuthenticationPrincipal String accountId) {
        return scheduleService.createSchedule(dto, accountId);
    }

    @GetMapping("/me")
    public List<Schedule> getMySchedules(@AuthenticationPrincipal String accountId) {
        return scheduleService.getSchedules(accountId);
    }

    @GetMapping("/{id}")
    public Schedule getScheduleDetail(@PathVariable Long id) {
        return scheduleService.getScheduleDetail(id);
    }
}
