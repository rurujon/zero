package com.zd.back.exchange.mapper;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.zd.back.exchange.model.Exchange;

@Mapper
public interface ExchangeMapper {

    int maxExchangeId();
    void createdExchange(Exchange exchange);
    List<Exchange> getExchanges(int pageStart, int pageEnd);
    int getDataCount();
    Exchange getExArticle(int exchangeId);

}
