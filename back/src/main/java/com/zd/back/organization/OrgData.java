package com.zd.back.organization;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrgData {

    private String location;
    private String name;
    private String description; 
    private String link;
}
