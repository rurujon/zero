package com.zd.back.login.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.zd.back.login.service.MemberService;
import com.zd.back.login.model.Member;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private MemberService memberService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");

        String memId = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            try {
                memId = jwtUtil.extractMemId(jwt);
                logger.info("Extracted memId from JWT: {}", memId);
            } catch (Exception e) {
                logger.error("Failed to extract memId from JWT", e);
            }
        } else {
            logger.debug("No JWT token found in request headers");
        }

        if (memId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                Member member = memberService.getMemberById(memId);
                if (member != null && jwtUtil.validateToken(jwt)) {
                    UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                            .username(member.getMemId())
                            .password(member.getPwd())
                            .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + member.getRole().name())))
                            .build();

                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    logger.info("Authentication set for user: {}", memId);
                } else {
                    logger.warn("Token validation failed for user: {}", memId);
                }
            } catch (Exception e) {
                logger.error("Failed to set authentication", e);
            }
        }

        filterChain.doFilter(request, response);
    }
}
