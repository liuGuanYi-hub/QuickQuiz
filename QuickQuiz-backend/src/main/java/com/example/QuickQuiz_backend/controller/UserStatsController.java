package com.example.QuickQuiz_backend.controller;

import com.example.QuickQuiz_backend.dto.DailyStatsDto;
import com.example.QuickQuiz_backend.dto.ExerciseRecordDto;
import com.example.QuickQuiz_backend.dto.TypeAccuracyDto;
import com.example.QuickQuiz_backend.dto.UserStatsResponse;
import com.example.QuickQuiz_backend.entity.User;
import com.example.QuickQuiz_backend.repository.UserRepository;
import com.example.QuickQuiz_backend.service.UserStatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserStatsController {

    private final UserStatsService userStatsService;
    private final UserRepository userRepository;

    @GetMapping("/me/stats")
    public ResponseEntity<UserStatsResponse> getMyStats(@AuthenticationPrincipal UserDetails userDetails) {
        User user = getCurrentUser(userDetails);
        return ResponseEntity.ok(userStatsService.getUserStats(user.getId()));
    }

    @GetMapping("/me/stats/daily")
    public ResponseEntity<List<DailyStatsDto>> getMyDailyStats(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "7") int days) {
        User user = getCurrentUser(userDetails);
        return ResponseEntity.ok(userStatsService.getDailyStats(user.getId(), Math.min(days, 90)));
    }

    @GetMapping("/me/records")
    public ResponseEntity<Page<ExerciseRecordDto>> getMyRecords(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        User user = getCurrentUser(userDetails);
        return ResponseEntity.ok(userStatsService.getRecordList(user.getId(), page, size));
    }

    @GetMapping("/me/records/{recordId}")
    public ResponseEntity<ExerciseRecordDto> getRecordDetail(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long recordId) {
        User user = getCurrentUser(userDetails);
        return ResponseEntity.ok(userStatsService.getRecordDetail(user.getId(), recordId));
    }

    @GetMapping("/me/stats/types")
    public ResponseEntity<List<TypeAccuracyDto>> getMyTypeAccuracy(
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = getCurrentUser(userDetails);
        return ResponseEntity.ok(userStatsService.getTypeAccuracy(user.getId()));
    }

    private User getCurrentUser(UserDetails userDetails) {
        return userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("用户不存在"));
    }
}
