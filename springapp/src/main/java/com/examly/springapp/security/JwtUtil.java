// package com.examly.springapp.security;

// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import io.jsonwebtoken.security.Keys;

// import java.security.Key;
// import java.util.Date;

// public class JwtUtil {

//     // Use a secure random key
//     private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

//     public static String generateToken(String username, String role) {
//         long expirationMillis = 1000 * 60 * 60; // 1 hour

//         return Jwts.builder()
//                 .setSubject(username)
//                 .claim("role", role)
//                 .setIssuedAt(new Date())
//                 .setExpiration(new Date(System.currentTimeMillis() + expirationMillis))
//                 .signWith(key) // must be a Key object
//                 .compact();
//     }
// }
package com.examly.springapp.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET = "MySuperSecretKey1234567890MySuperSecretKey"; 
    private static final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    private static final long EXPIRATION_MILLIS = 1000 * 60 * 60; // 1 hour

    // Make method non-static
    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MILLIS))
                .signWith(key)
                .compact();
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public String extractRole(String token) {
        return (String) extractAllClaims(token).get("role");
    }

    public boolean validateToken(String token, String username) {
        final String tokenUsername = extractUsername(token);
        return (tokenUsername.equals(username) && !isTokenExpired(token));
    }

    public boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
