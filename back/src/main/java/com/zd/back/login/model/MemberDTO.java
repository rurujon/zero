package com.zd.back.login.model;

import lombok.Data;

@Data
public class MemberDTO {
    private String memId;
    private String memName;
    private String email;
    private String tel;
    private String role;
}
