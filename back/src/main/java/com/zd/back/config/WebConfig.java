package com.zd.back.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);

    }


     //getAllImgBoardWithFirstImage  --SeounEun . date:24/10/21 -- /images/imgboard/ 변경 확인함 --24/11/01
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/imgboard/**")  // 제공할 URL 패턴
                .addResourceLocations("file:///C:/VSCode/zero/front/public/images/imgboard/");  // 실제 파일 경로
        registry.addResourceHandler("/images/notices/**")
                .addResourceLocations("file:///C:/VSCode/zero/front/public/images/notices/");
    } 
 /*    @Override   -- 이미지 게시판 push pull 생략위해 test해봄 
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/imgboard/**")
                .addResourceLocations("file:///C:/VSCode/zero/front/public/images/imgboard/")
                .setCachePeriod(3600)
                .resourceChain(true);
        registry.addResourceHandler("/images/notices/**")
                .addResourceLocations("file:///C:/VSCode/zero/front/public/images/notices/")
                
    } */

}
