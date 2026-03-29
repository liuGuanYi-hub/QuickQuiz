package com.example.QuickQuiz_backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.HexFormat;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    /**
     * HS256 密钥字节：使用 HEX（偶数位十六进制）或 BASE64 编码，由 {@code jwt.secret.encoding} 指定。
     */
    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.secret.encoding:HEX}")
    private String secretEncoding;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 10))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = decodeSecret();
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private byte[] decodeSecret() {
        String enc = secretEncoding != null ? secretEncoding.trim().toUpperCase() : "HEX";
        if ("BASE64".equals(enc)) {
            return Decoders.BASE64.decode(secretKey.trim());
        }
        if ("HEX".equals(enc)) {
            String hex = secretKey.trim().replaceAll("\\s+", "");
            if (hex.length() % 2 != 0) {
                throw new IllegalStateException("jwt.secret (HEX) 长度必须为偶数位");
            }
            return HexFormat.of().parseHex(hex);
        }
        throw new IllegalStateException("jwt.secret.encoding 仅支持 HEX 或 BASE64，当前: " + secretEncoding);
    }
}
