package com.zd.back.JY.domain.dailyQuiz;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuizServiceImp implements QuizService {

    @Autowired
    private QuizMapper quizMapper;


    public int maxNum(){
        return quizMapper.maxNum();
    }
    
    public void insertquiz(Map map){

        QuizDTO dto;

        for(int i=1; i<map.size(); i++){
            
            //int id = Integer.parseInt(map.get(i).toString());
            
            int id = maxNum();

            String [] qae = (String[]) map.get(i);
    
            dto = new QuizDTO(id, qae[0],qae[1], qae[2]);

            
            System.out.println(i+"번째 퀴즈 삽입 완료");
            System.out.println(qae[0]);
            System.out.println(qae[1]);
            System.out.println(qae[2]+"\n\n");

            quizMapper.insertquiz(dto);
        }
        

        //map을 받아서 dto로 만든다음에 넣어준다.
    }

}

