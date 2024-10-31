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
import com.zd.back.login.service.LogoutService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@EnableTransactionManagement
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Autowired
    private LogoutService logoutService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .cors().and().csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
                .antMatchers("/member/register", "/member/login", "/member/find-id", "/member/find-password", "/api/auth/**", "/member/refresh-token").permitAll()
                .antMatchers("/attendance/**", "/api/point/**").authenticated()
                .antMatchers("/member/admin/**").hasRole("ADMIN")
                .anyRequest().permitAll()
            .and()
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .logout()
                .logoutUrl("/member/logout")
                .addLogoutHandler(logoutService)
                .logoutSuccessHandler((request, response, authentication) -> {
                    // 로그아웃 성공 시 처리
                });

        return http.build();
    }

        /*http
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


 */
    @Bean
    public RestTemplate restTemplate() {
    return new RestTemplate();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.addAllowedOrigin("http://localhost:3000");
    configuration.addAllowedMethod("*");
    configuration.addAllowedHeader("*");
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
        }
    }
