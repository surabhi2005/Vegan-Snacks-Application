// package com.examly.springapp.security;

// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
// import org.springframework.stereotype.Component;
// import org.springframework.web.filter.OncePerRequestFilter;

// import java.io.IOException;
// import java.util.Collections;

// @Component
// public class JWTAuthorizationFilter extends OncePerRequestFilter {

//     private final JwtUtil jwtUtil;

//     public JWTAuthorizationFilter(JwtUtil jwtUtil) {
//         this.jwtUtil = jwtUtil;
//     }

//     @Override
//     protected void doFilterInternal(HttpServletRequest request,
//                                     HttpServletResponse response,
//                                     FilterChain filterChain) throws ServletException, IOException {

//         final String header = request.getHeader("Authorization");

//         // If no token, continue filter chain
//         if (header == null || !header.startsWith("Bearer ")) {
//             filterChain.doFilter(request, response);
//             return;
//         }

//         String token = header.substring(7); // Remove "Bearer "
//         String username;

//         try {
//             username = jwtUtil.extractUsername(token);
//         } catch (Exception e) {
//             // Invalid token
//             response.setStatus(HttpServletResponse.SC_FORBIDDEN);
//             return;
//         }

//         // If user not authenticated yet
//         if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//             String role = jwtUtil.extractRole(token);

//             // Create auth token for Spring Security
//             UsernamePasswordAuthenticationToken authToken =
//                     new UsernamePasswordAuthenticationToken(
//                             username,
//                             null,
//                             Collections.singletonList(() -> "ROLE_" + role) // prefix role for Spring
//                     );

//             authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//             SecurityContextHolder.getContext().setAuthentication(authToken);
//         }

//         filterChain.doFilter(request, response);
//     }
// }
package com.examly.springapp.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JWTAuthorizationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JWTAuthorizationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
            String path = request.getRequestURI(); 

        if (path.startsWith("/user/login") || path.startsWith("/user/signup")) {
        filterChain.doFilter(request, response);
        return;
    }
        final String header = request.getHeader("Authorization");

        // If no token or wrong format, block access
        if (header == null || !header.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Missing or invalid Authorization header");
            return;
        }

        String token = header.substring(7); // Remove "Bearer "
        String username;
        String role;

        try {
            username = jwtUtil.extractUsername(token);
            role = jwtUtil.extractRole(token);
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write("Invalid or expired token");
            return;
        }

        // If user not authenticated yet
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                            username,
                            null,
                            Collections.singletonList(() -> "ROLE_" + role) // prefix role for Spring Security
                    );

            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }

        filterChain.doFilter(request, response);
    }
}
