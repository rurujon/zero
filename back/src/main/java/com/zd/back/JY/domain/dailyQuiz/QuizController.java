package com.zd.back.JY.domain.dailyQuiz;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.zd.back.JY.work.ReadJSON;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@CrossOrigin(origins = "http://localhost:3000") // 클라이언트의 주소
@Controller
public class QuizController {
    
    @Resource
    private QuizService quizService;


    @PostMapping("/checkQH")
        public ResponseEntity<?> checkAttendance(@RequestParam String memId) {
            try {
                // 해당 회원의 오늘 퀴즈 참여 여부를 체크
                int count = quizService.checkToday(memId);
                
                // 오늘 퀴즈에 참여한 경우
                if (count > 0) {
                    Map<String, String> response = new HashMap<>();
                    response.put("message", "done");
                    return ResponseEntity.ok().body(response);
                } else {
                    // 오늘 퀴즈에 참여하지 않은 경우
                    Map<String, String> response = new HashMap<>();
                    response.put("message", "yet");
                    return ResponseEntity.ok().body(response);
                }
            } catch (Exception e) {
                // 예외 발생 시 에러 메시지 반환
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", e.getMessage());
                return ResponseEntity.badRequest().body(errorResponse);
            }
    }

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
    
    @PostMapping("/insertQH")
    public ResponseEntity<String> insertQuizHistory(@RequestBody Map<Object, Object> request) {
        try {
            // 요청 데이터 로그 출력
            System.out.println("Received request: " + request);
    
            quizService.insertQH(request);
            return ResponseEntity.ok("퀴즈 히스토리 저장 성공");
        } catch (Exception e) {
            // 예외 메시지 로그 출력
            System.err.println("Error occurred: " + e.getMessage());
            return ResponseEntity.status(500).body("퀴즈 히스토리 저장 실패: " + e.getMessage());
        }
        
    }

}
