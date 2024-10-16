package com.zd.back.config;

import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.zd.back.login.security.JwtFilter;

import lombok.RequiredArgsConstructor;

//24-10-16추가 정우준
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        http
        .cors().and().csrf().disable().headers().frameOptions().disable()
        .and()
        .authorizeRequests()
        .anyRequest().permitAll()
        .and()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
		.logout().logoutSuccessUrl("/");

        return http.build();
    }

    // @Bean
    // public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    //     http.cors()
    //     .and()
    //     .csrf().disable()
    //     .authorizeHttpRequests()
    //     .antMatchers("/","/member/register", "/member/login", "/member/info", "/member/**", "/member/logout","/*", "/api/naver").permitAll()
    //     .anyRequest().authenticated()
    //     .and()
    //     .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    //     http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    //     .formLogin().disable();
    // return http.build();
    // }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    //24-10-16 정우준 추가
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }


}





// @Configuration
// @RequiredArgsConstructor
// @EnableWebSecurity
// public class SecurityConfig {


//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

//         http
//         .cors().and().csrf().disable().headers().frameOptions().disable()
//         .and()
//         .authorizeRequests()
//         .anyRequest().permitAll()
//         .and()
// 		.logout().logoutSuccessUrl("/");

//         return http.build();
//     }

// }

