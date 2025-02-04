package com.ecom.utils;

import com.ecom.entities.Role;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import io.github.cdimascio.dotenv.Dotenv;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Set;

@Component
@AllArgsConstructor
public class JwtUtils {
    public String generateToken(String username, Set<Role> rolesSet) throws Exception {
        String SECRET = getJwtSecretCode();
        Role[] roles = rolesSet.toArray(new Role[0]);
        StringBuilder roleClaim = new StringBuilder();
        for (int i = 0; i < roles.length; i++) {
            roleClaim.append(i != roles.length - 1 ? roles[i].getName() + ',' : roles[i].getName());
        }
        return JWT.create()
                .withSubject(username)
                .withIssuedAt(new Date())
                .withIssuer("NONE")
                .withClaim("role", roleClaim.toString())
                .sign(Algorithm.HMAC256(SECRET));
    }

    public DecodedJWT validateToken(String jwt) throws Exception {
        String SECRET = getJwtSecretCode();
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SECRET))
                .withIssuer("NONE")
                .build();
        return verifier.verify(jwt);
    }

    private String getJwtSecretCode() throws Exception {
        String SECRET = Dotenv.load().get("JWT_SECRET");
        if (SECRET == null) {
            throw new Exception("JWT_SECRET not found");
        }
        return SECRET;
    }
}
