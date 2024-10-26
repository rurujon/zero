package com.zd.back.JY.domain.point;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/point")
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

    @GetMapping("/info/{memId}")
    public ResponseEntity<PointDTO> getPointInfo(@PathVariable String memId) {
        PointDTO pointInfo = pointService.findByMemId(memId);
        if (pointInfo != null) {
            return ResponseEntity.ok(pointInfo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 기존 코드 주석 처리
    /*
    @PostMapping("/result.action")
    public ModelAndView result_ok(PointDTO dto, HttpServletRequest request) throws Exception {
        ModelAndView mav = new ModelAndView();
        dto = pointService.findByMemId(request.getParameter("memId"));


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
        String memId = request.getParameter("memId");
        String oper = request.getParameter("oper");
        int updown = Integer.parseInt(request.getParameter("updown"));

        Map<String, Object> operMap = new HashMap<>();
        operMap.put("oper", oper);
        operMap.put("updown", updown);


        pointService.updatePoint(memId, operMap);

        mav.addObject("memId", dto.getMemId());
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

        pointService.insertData(request.getParameter("memId"));

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

        String memId = request.getParameter("memId");

        ModelAndView mav = new ModelAndView();

        dto = pointService.findByMemId(memId);

        mav.addObject("pointId", dto.getPointId());
        mav.addObject("usedPoint", dto.getUsedPoint());
        mav.addObject("maxPoint",dto.getMaxPoint());

        mav.setViewName("/JY/result");

        return mav;
    }
    */

    @GetMapping("/history/{memId}")
    public ResponseEntity<List<PointHistoryDTO>> getPointHistory(@PathVariable String memId) {
        List<PointHistoryDTO> history = pointService.getPointHistory(memId);
        return ResponseEntity.ok(history);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updatePoint(@RequestBody Map<String, Object> request) {
        try {
            String memId = (String) request.get("memId");
            pointService.updatePoint(memId, request);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
