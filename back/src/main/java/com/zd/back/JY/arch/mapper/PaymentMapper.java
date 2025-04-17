package com.zd.back.JY.arch.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.zd.back.JY.arch.DTO.PaymentDTO;


@Mapper
public interface PaymentMapper {
    
    public int maxNum();

    public void insertpayment(PaymentDTO dto);

    public List<PaymentDTO> getDonateHistory(String BUYERID);
}
