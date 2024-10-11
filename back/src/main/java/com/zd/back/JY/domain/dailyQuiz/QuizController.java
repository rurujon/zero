package com.zd.back.domain.dailyQuiz;

import java.util.Map;

import javax.annotation.Resource;

import org.json.simple.JSONArray;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import com.zd.back.domain.point.PointService;
import com.zd.back.work.ReadJSON;

@Controller
public class QuizController {
    
    @Resource
    private QuizService quizService;

    QuizDTO dto;


    @GetMapping(value="/quiz")
    public ModelAndView test() throws Exception{
        ModelAndView mav = new ModelAndView();

        ReadJSON rj = new ReadJSON();

        JSONArray array = rj.jsonToArray("C:\\vscode\\project\\back\\src\\main\\resources\\quiz\\zerowaste");

        Map<Integer , String[]> map = rj.unzipArray(array);

        quizService.insertquiz(map);

        mav.setViewName("index");

        return mav;
    }
    

}
