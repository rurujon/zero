package com.zd.back.JY.domain.point;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;





@Controller
public class PointController {

    @Resource
    private PointService  pointService;

    PointDTO dto;

    @GetMapping(value="/")
    public ModelAndView index() throws Exception{
        ModelAndView mav = new ModelAndView();
        mav.setViewName("/JY/index");

        return mav;
    }
    

    @PostMapping("/result.action")
    public ModelAndView result_ok(PointDTO dto, HttpServletRequest request) throws Exception {
        ModelAndView mav = new ModelAndView();

        dto.setPointId(pointService.maxNum()+1);

        // pointService.insertData(dto);
        

        dto = pointService.findById(Integer.parseInt(request.getParameter("pointid")));


        mav.addObject("pointId", dto.getPointId());
        mav.addObject("usedPoint", dto.getUsedPoint());
        mav.addObject("maxPoint", dto.getMaxPoint());

        mav.setViewName("/JY/result");

        return mav;
    }

    @GetMapping("/manage.action")
    public ModelAndView upDown() {

        ModelAndView mav = new ModelAndView();

        mav.setViewName("/JY/PointManage");

        return mav;
    }
      
    @PostMapping("/manage.action")
    public ModelAndView upDown(HttpServletRequest request) throws Exception {
        ModelAndView mav = new ModelAndView();
        
        int pointId = Integer.parseInt(request.getParameter("pointId"));

        String oper = request.getParameter("oper");
        System.out.println("oper: "+oper);
        
        int updown = Integer.parseInt(request.getParameter("updown"));

        System.out.println("updown: "+ updown);

        PointDTO dto = pointService.findById(pointId);

        System.out.println(dto.getMemId());
        System.out.println(dto.getPointId());
        System.out.println(dto.getMaxPoint());
        System.out.println(dto.getUsedPoint());
        System.out.println(dto.getGrade());

        //dto.setGrade(dto.getGrade());

        if(oper.equals("+")){
            dto.setUsedPoint(dto.getUsedPoint()+updown);

            dto.setMaxPoint(dto.getMaxPoint()+updown);


        }else if(oper.equals("-")){

            if(dto.getUsedPoint()-updown<0){
                throw new Exception("0보다 작을 수 없습니다.");
            }
            dto.setUsedPoint(dto.getUsedPoint()-updown);

        }

        pointService.updatePoint(dto);


        
        mav.addObject("pointId", dto.getPointId());
        mav.addObject("usedPoint", dto.getUsedPoint());
        mav.addObject("maxPoint", dto.getMaxPoint());
        mav.setViewName("/JY/result");


        return mav;
    }
    
    @GetMapping("/signup.action")
    public ModelAndView signPoint() {

        ModelAndView mav = new ModelAndView();


        mav.setViewName("/JY/signup");
        System.out.println("getMapping/signup.action 114line");
        return mav;
    }

    @PostMapping("/signup_ok")
    public ModelAndView signPoint_ok( HttpServletRequest request) {
        ModelAndView mav = new ModelAndView();
        dto = new PointDTO();
        
        int maxNum = pointService.maxNum();
        
        String memId = request.getParameter("memId");

        System.out.println(maxNum);
        System.out.println(memId);

        dto.setPointId(maxNum+1);
        dto.setMemId(memId);
        dto.setGrade("level1");
        
        System.out.println("postMapping/signup.ok 130Line");
        pointService.insertData(dto);

        System.out.println("등록 완료 id: "+dto.getPointId());
        System.out.println("maxPoint: "+ dto.getMaxPoint());
        System.out.println("usedPoint: "+ dto.getUsedPoint());
        System.out.println("memId: "+dto.getMemId());
        System.out.println("grade: "+dto.getGrade());

        mav.setViewName("/JY/index");

        return mav;
    }
    
    @GetMapping("/find.action")
    public ModelAndView getMethodName() {
        ModelAndView mav = new ModelAndView();

        mav.setViewName("/JY/findById");

        return mav;
    }
    
    @PostMapping("/find_ok")
    public ModelAndView postMethodName(HttpServletRequest request) {

        int pointId = Integer.parseInt(request.getParameter("pointId"));

        ModelAndView mav = new ModelAndView();

        dto = pointService.findById(pointId);

        mav.addObject("pointId", dto.getPointId());
        mav.addObject("usedPoint", dto.getUsedPoint());
        mav.addObject("maxPoint",dto.getMaxPoint());

        mav.setViewName("/JY/result");

        return mav;
    }
    

}
