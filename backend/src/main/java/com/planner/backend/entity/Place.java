package com.planner.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;
    private String phone;
    private String timeSlot; // "오전", "오후"

    @ManyToOne
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    // Getter/Setter 생략 가능 (Lombok 사용 시 @Data 또는 @Getter/@Setter)
}
