package com.zd.back.JY.domain.payment;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PaymentMapper {
    
    public int maxNum();

    public void insertpayment(PaymentDTO dto);
}
