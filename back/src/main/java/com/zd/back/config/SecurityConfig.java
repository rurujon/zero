package com.zd.back.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.client.RestTemplate;

@Configuration
public class SecurityConfig {


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeRequests()
            //.antMatchers("/member/register", "/member/login", "/member/info").permitAll()
            .anyRequest().permitAll()//authenticated()
            .and()
            .formLogin().disable();
        return http.build();
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();


    }


}
