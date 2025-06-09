package com.planner.backend.service;

import com.planner.backend.dto.ScheduleRequestDto;
import com.planner.backend.entity.Place;
import com.planner.backend.entity.Schedule;
import com.planner.backend.entity.User;
import com.planner.backend.repository.ScheduleRepository;
import com.planner.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;

    @Transactional
    public Schedule createSchedule(ScheduleRequestDto dto, String accountId) {
        User user = userRepository.findByAccountId(accountId)
                .orElseThrow(() -> new IllegalArgumentException("사용자 없음"));

        Schedule schedule = new Schedule();
        schedule.setTitle(dto.getTitle());
        schedule.setUser(user);

        for (ScheduleRequestDto.PlaceDto placeDto : dto.getPlaces()) {
            Place place = new Place();
            place.setName(placeDto.getName());
            place.setAddress(placeDto.getAddress());
            place.setPhone(placeDto.getPhone());
            place.setTimeSlot(placeDto.getTimeSlot());
            place.setSchedule(schedule);

            schedule.getPlaces().add(place);
        }

        return scheduleRepository.save(schedule);
    }

    public List<Schedule> getSchedules(String accountId) {
        User user = userRepository.findByAccountId(accountId)
                .orElseThrow(() -> new IllegalArgumentException("사용자 없음"));
        return scheduleRepository.findByUser(user);
    }

    public Schedule getScheduleDetail(Long scheduleId) {
        return scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new IllegalArgumentException("일정 없음"));
    }
}
