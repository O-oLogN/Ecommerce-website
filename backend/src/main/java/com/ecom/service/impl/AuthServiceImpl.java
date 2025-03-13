package com.ecom.service.impl;

import com.ecom.constant.CoreConstants;
import com.ecom.dto.request.auth.SignInRequest;
import com.ecom.entities.Role;
import com.ecom.entities.Session;
import com.ecom.entities.User;
import com.ecom.entities.UserRole;
import com.ecom.exception.SessionNotFoundException;
import com.ecom.helper.MessageHelper;
import com.ecom.helper.ResponseHelper;
import com.ecom.repository.SessionRepository;
import com.ecom.repository.UserRepository;
import com.ecom.service.AuthService;
import com.ecom.utils.JwtUtils;
import com.ecom.utils.ValidationUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.xml.bind.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final SessionRepository sessionRepository;

    private final CustomUserDetailsService customUserDetailsService;

    private final EntityManager entityManager;

    private final JwtUtils jwtUtils;

    private final AuthenticationManager authenticationManager;

    private final MessageHelper messageHelper;

    @Override
    public ResponseEntity<?> signIn(SignInRequest signinRequest) throws Exception {
        String username = signinRequest.getUsername();
        String rawPassword = signinRequest.getPassword();

        if (ValidationUtils.isNullOrEmpty(username)
        || ValidationUtils.isNullOrEmpty(rawPassword)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.authController.auth.error.validation")
            );
        }

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                username,
                rawPassword
        ));

        User fetchedUser = userRepository.findUserByUsername(username);
        closeAllPriorSessions(fetchedUser.getUserId());

        Session newSession = Session
                .builder()
                .sessionId(UUID.randomUUID().toString())
                .fromTime(LocalDateTime.now())
                .createUser(CoreConstants.ROLE.ADMIN)
                .userId(fetchedUser.getUserId())
                .createDatetime(LocalDateTime.now())
                .build();

        sessionRepository.save(newSession);
        Set<UserRole> userRoles = fetchedUser.getUserRoles();
        Set<Role> roles = new HashSet<>();
        userRoles.forEach(userRole -> roles.add(userRole.getRole()));
        return ResponseHelper.ok(jwtUtils.generateToken(username, roles),
                HttpStatus.OK, messageHelper.getMessage("admin.authController.auth.info.authorized"));
    }

    @Override
    public ResponseEntity<?> signOut(String sessionId) throws Exception {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new SessionNotFoundException(
                    messageHelper.getMessage("admin.authController.auth.session.find.error.notFound")
                ));
        session.setToTime(LocalDateTime.now());
        sessionRepository.save(session);
        return ResponseHelper.ok(session, HttpStatus.OK, messageHelper.getMessage("admin.authController.auth.info.leave"));
    }

    /* -------------------------------------------------- Private Methods ------------------------------------------------------- */
    private void closeAllPriorSessions(String userId) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();

        CriteriaQuery<Session> query = cb.createQuery(Session.class);
        Root<Session> sessionRoot = query.from(Session.class);

        Predicate userPredicate = cb.equal(sessionRoot.get("userId"), userId);

        query.select(sessionRoot).where(userPredicate);

        List<Session> sessions = entityManager.createQuery(query).getResultList();

        for (Session session : sessions) {
            if (!ValidationUtils.isNullOrEmpty(session.getToTime())) continue;
            session.setToTime(LocalDateTime.now());
        }
        sessionRepository.saveAll(sessions);
    }
}
