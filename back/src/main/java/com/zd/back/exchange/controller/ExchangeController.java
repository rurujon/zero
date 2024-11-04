package com.zd.back.exchange.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.zd.back.exchange.model.Exchange;
import com.zd.back.exchange.model.ExchangeResponse;
import com.zd.back.exchange.service.ExchangeService;
import com.zd.back.imgboard.model.ImgPost;


@RestController
@RequestMapping("/exchange")
public class ExchangeController {

    @Autowired
    private ExchangeService exchangeService;

    @PostMapping("/created")
    public ResponseEntity<String> createdExchange(@ModelAttribute Exchange exchange) {
        try {

            int maxExchangeId = exchangeService.maxExchangeId() ;
            exchange.setExchangeId(maxExchangeId+1);
            exchangeService.createdExchange(exchange);

            return ResponseEntity.status(HttpStatus.CREATED).body("교환 게시물이 등록되었습니다.");
        } catch (Exception e) {
            System.out.println(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("교환 게시물 등록 중 오류가 발생했습니다.");
        }
    }



    @GetMapping("/list")
    public ResponseEntity<ExchangeResponse> getExchanges(
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "15") int size) {
        
        List<Exchange> exchanges = exchangeService.getExchanges(page, size);
        int totalElements = exchangeService.getDataCount();
       
        ExchangeResponse response = new ExchangeResponse(exchanges, totalElements);

        return ResponseEntity.ok(response);
    }


}
