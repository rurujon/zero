package com.zd.back.naversearchapi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class SearchApiController {

    @GetMapping("/naverNews")
    public String naverNews(@RequestParam String param) {
        return new String();
    }
    
    
}
