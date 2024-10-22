package com.zd.back.JY.domain.attendance;

import lombok.Data;

@Data
public class AttendanceDTO {
    
    private int attId;
    private String attDate;
    private String memId;

    public AttendanceDTO() {
        this.attDate="00/00/00";
    }

}
