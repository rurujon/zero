package com.zd.back.JY.domain.dailyQuiz;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.zd.back.JY.work.ReadJSON;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;



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
    
    @GetMapping("/getQuiz")
    @ResponseBody
    public JSONObject getRandomQuiz() throws Exception {
        ReadJSON readJSON = new ReadJSON();
        QuizDTO dto;

        dto = quizService.getRandomQuiz();

        JSONObject object = readJSON.toJsonObject(dto);

        if(dto!=null){
            return object;
        } else throw new Exception("퀴즈를 찾을 수 없습니다.");

    
    }
}
