package com.zd.back.mainminiboard.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.zd.back.mainminiboard.model.MiniBoard;
import com.zd.back.mainminiboard.service.MiniBoardService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



/**
 * MiniBoardConroller
 */
@RestController
public class MiniBoardConroller {

    @Autowired
    private MiniBoardService miniBoardService;

    @GetMapping("/miniNotice")
    public List<MiniBoard> getMiniNotice() throws Exception{
        return miniBoardService.getNotices();
    }
    
    // @GetMapping("/miniNews")
    // public List<MiniBoard> getMiniNews() throws Exception{
    //     return miniBoardService.getNews();
    // }
    
    

    
}