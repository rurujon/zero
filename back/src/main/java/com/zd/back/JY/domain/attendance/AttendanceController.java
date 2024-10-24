package com.zd.back.JY.domain.attendance;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @GetMapping("/list/{memId}")
    public ResponseEntity<List<AttendanceDTO>> getMonthlyAttendance(
            @PathVariable String memId,
            @RequestParam int year,
            @RequestParam int month) {
        List<AttendanceDTO> attendance = attendanceService.getMonthlyAttendance(memId, year, month);
        return ResponseEntity.ok(attendance);
    }

    @GetMapping("attendance/dates")
    public ResponseEntity<List<Date>> getAttendanceDates(@RequestParam String memId) {
        List<Date> attendanceDates = attendanceService.getAttendanceDates(memId);
        return ResponseEntity.ok(attendanceDates);
    }
}
