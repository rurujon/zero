package com.zd.back.config;

<<<<<<< HEAD
import java.util.Arrays;

=======

import javax.management.relation.Role;

import org.springframework.beans.factory.annotation.Autowired;
>>>>>>> Jun_Young
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
<<<<<<< HEAD
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
=======

import lombok.RequiredArgsConstructor;

>>>>>>> Jun_Young

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {


    @Bean
<<<<<<< HEAD
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors()
        .and()
        .csrf().disable()
        .authorizeHttpRequests()
        .antMatchers("/","/member/register", "/member/login", "/member/info", "/member/**", "/member/logout","/*").permitAll()
        .anyRequest().authenticated()
        .and()
        .formLogin().disable();
    return http.build();
    }

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


=======
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        
        http
        .cors().and().csrf().disable().headers().frameOptions().disable()
        .and()
        .authorizeRequests()
        .anyRequest().permitAll()
        .and()
		.logout().logoutSuccessUrl("/");

        return http.build();
    }

>>>>>>> Jun_Young
}
