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
        mav.setViewName("index");

        return mav;
    }
    

    @PostMapping("/result.action")
    public ModelAndView result_ok(PointDTO dto, HttpServletRequest request) throws Exception {
        ModelAndView mav = new ModelAndView();

        dto.setId(pointService.maxNum()+1);

        // pointService.insertData(dto);
        
        System.out.print("\n\n POSTMappint \n\n");

        dto = pointService.findById(2);

        System.out.println("findById \n\n\n" +dto.getId() +"\n\n\n findById");

        mav.addObject("id", dto.getId());
        mav.addObject("usedPoint", dto.getUsedPoint());
        mav.addObject("maxPoint", dto.getMaxPoint());

        mav.setViewName("result");

        return mav;
    }

    @GetMapping("/manage.action")
    public ModelAndView upDown() {

        ModelAndView mav = new ModelAndView();

        mav.setViewName("PointManage");

        return mav;
    }
      
    @PostMapping("/manage.action")
    public ModelAndView upDown(HttpServletRequest request) {
        ModelAndView mav = new ModelAndView();
        
        int id = Integer.parseInt(request.getParameter("id"));

        String oper = request.getParameter("oper");
        System.out.println("oper: "+oper);
        
        int updown = Integer.parseInt(request.getParameter("updown"));

        System.out.println("updown: "+ updown);

        PointDTO dto = pointService.findById(id);

        if(oper.equals("+")){
            dto.setUsedPoint(dto.getUsedPoint()+updown);

            dto.setMaxPoint(dto.getMaxPoint()+updown);

            pointService.updatePoint(dto);

        }else if(oper.equals("-")){

            dto.setUsedPoint(dto.getUsedPoint()-updown);
        }


        
        mav.addObject("id", dto.getId());
        mav.addObject("usedPoint", dto.getUsedPoint());
        mav.addObject("maxPoint", dto.getMaxPoint());
        mav.setViewName("result");


        return mav;
    }
    
    @GetMapping("/signup.action")
    public ModelAndView signPoint() {

        ModelAndView mav = new ModelAndView();


        mav.setViewName("signup");

        return mav;
    }

    @PostMapping("/signup_ok")
    public ModelAndView signPoint_ok() {
        ModelAndView mav = new ModelAndView();

        int maxNum = pointService.maxNum();
        
        dto = new PointDTO();

        dto.setId(maxNum+1);

        pointService.insertData(dto);

        System.out.println("등록 완료 id: "+dto.getId());

        mav.setViewName("index");

        return mav;
    }
    
    @GetMapping("/find.action")
    public ModelAndView getMethodName() {
        ModelAndView mav = new ModelAndView();

        mav.setViewName("findById");

        return mav;
    }
    
    @PostMapping("/find_ok")
    public ModelAndView postMethodName(HttpServletRequest request) {

        int id = Integer.parseInt(request.getParameter("id"));

        ModelAndView mav = new ModelAndView();

        dto = pointService.findById(id);

        mav.addObject("id", dto.getId());
        mav.addObject("usedPoint", dto.getUsedPoint());
        mav.addObject("maxPoint",dto.getMaxPoint());

        mav.setViewName("result");

        return mav;
    }
    

}
