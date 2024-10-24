package com.zd.back.JY.domain.payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.siot.IamportRestClient.IamportClient;


@Service
public class PayService {
    
    private IamportClient api;


    public PayService(){
        this.api= new IamportClient("2467100118816737", "It0kkm3a8XLgUsC88uAwAV6DRQCCGB0dZ6CzCSfWnC7nPAlMs3yLggnkPnTw4yvQpz9Njq7MxE7HhDwK");
    }
}
