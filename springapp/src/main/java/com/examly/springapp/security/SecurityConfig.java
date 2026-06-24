//  package com.examly.springapp.security;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.web.SecurityFilterChain;

// @Configuration
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         http
//             .cors()
//             .and()
//             .csrf().disable() // disable CSRF for REST APIs
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers("/user/login", "/user/signup").permitAll() // allow your custom endpoints
//                 .anyRequest().authenticated() // everything else requires auth
//             )
//             .formLogin().disable()   // DISABLE Spring Security default login form
//             .httpBasic().disable();  // optional: disable basic auth
//         return http.build();
//     }
// }
package com.examly.springapp.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JWTAuthorizationFilter jwtFilter;

    public SecurityConfig(JWTAuthorizationFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors().and()
            .csrf().disable()
            .authorizeHttpRequests()
            // Public endpoints
            .requestMatchers("/user/login", "/user/signup").permitAll()
            
            // Protected endpoints (only accessible to authenticated CUSTOMER or VENDOR)
            .requestMatchers("/snacks/getAllVeganSnacks").hasAnyRole("CUSTOMER","VENDOR","ADMIN","PRODUCT_MANAGER")
            .requestMatchers("/notifications/*/read").hasAnyRole("CUSTOMER")
            .requestMatchers("/user/update/**").hasAnyRole("CUSTOMER")
            .requestMatchers("/notifications/user/**").hasAnyRole("CUSTOMER")
            .requestMatchers("/certifications/all/**").hasAnyRole("CUSTOMER","ADMIN","PRODUCT_MANAGER")
            .requestMatchers("/orders/add/**").hasAnyRole("CUSTOMER")
            .requestMatchers("/orders/bycustomer/**").hasAnyRole("CUSTOMER")
            .requestMatchers("/product-reviews/bycustomer/**").hasAnyRole("CUSTOMER")
            .requestMatchers("/product-reviews/update/**").hasAnyRole("CUSTOMER")
            .requestMatchers("/product-reviews/delete/**").hasAnyRole("CUSTOMER")
            .requestMatchers("/product-reviews/add/**").hasAnyRole("CUSTOMER")
            .requestMatchers("/user/getbyid/**").hasAnyRole("CUSTOMER","ADMIN","PRODUCT_MANAGER")


            .requestMatchers("/api/analytics/sales/**").hasAnyRole("VENDOR")
            .requestMatchers("/vendor/post").hasAnyRole("VENDOR")
            .requestMatchers("/snacks/addVeganSnack").hasAnyRole("VENDOR")
            .requestMatchers("/snacks/getbyvendorid/**").hasAnyRole("VENDOR")
            .requestMatchers("/product-images/product/**").hasAnyRole("VENDOR","CUSTOMER")
            .requestMatchers("/snacks/delete/**").hasAnyRole("VENDOR")
            .requestMatchers("/snacks/getbyvendorid/**").hasAnyRole("VENDOR")
            .requestMatchers("/snacks/update/**").hasAnyRole("VENDOR")
            .requestMatchers("/inventory/all/**").hasAnyRole("VENDOR","ADMIN","PRODUCT_MANAGER")
            .requestMatchers("/inventory/get/**").hasAnyRole("VENDOR")
            .requestMatchers("/inventory/update/**").hasAnyRole("VENDOR")
            .requestMatchers("/inventory/add/**").hasAnyRole("VENDOR")
            .requestMatchers("/product-reviews/all").hasAnyRole("VENDOR","CUSTOMER","ADMIN","PRODUCT_MANAGER")
            .requestMatchers("/vendor/get/byuser/**").hasAnyRole("VENDOR")
            .requestMatchers("/vendor/get/").hasAnyRole("VENDOR")
            .requestMatchers("/vendor/update/").hasAnyRole("VENDOR")
            .requestMatchers("/certifications/vendor/**").hasAnyRole("VENDOR")
            .requestMatchers("/certifications/update/**").hasAnyRole("VENDOR")
            .requestMatchers("/product-images/add/**").hasAnyRole("VENDOR")
            .requestMatchers("/certifications/add/**").hasAnyRole("VENDOR")
            .requestMatchers("/certifications/delete/**").hasAnyRole("VENDOR")

            .requestMatchers("/vendor/all/**").hasAnyRole("ADMIN")
            .requestMatchers("/vendor/approve/**").hasAnyRole("ADMIN")
            .requestMatchers("/vendor/reject/**").hasAnyRole("ADMIN")
            .requestMatchers("/vendor/suspend/**").hasAnyRole("ADMIN")
            .requestMatchers("/snacks/countByStatus").hasAnyRole("ADMIN","PRODUCT_MANAGER")
            .requestMatchers("/snacks/approve/**").hasAnyRole("ADMIN","PRODUCT_MANAGER")
            .requestMatchers("/snacks/reject/**").hasAnyRole("ADMIN","PRODUCT_MANAGER")
            .requestMatchers("/user/getdata").hasAnyRole("ADMIN")
            .requestMatchers("/user/delete/**").hasAnyRole("ADMIN")
            .requestMatchers("/user/activate/**").hasAnyRole("ADMIN")
            .requestMatchers("/user/deactivate/**").hasAnyRole("ADMIN")
            .requestMatchers("/notifications/add").hasAnyRole("ADMIN")
            .requestMatchers("/notifications/get").hasAnyRole("ADMIN","PRODUCT_MANAGER")
            .requestMatchers("/orders/all").hasAnyRole("ADMIN","PRODUCT_MANAGER")


            
            // Everything else requires authentication
            .anyRequest().authenticated()
            .and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // Add JWT filter
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
