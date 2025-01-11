package com.client.service.impl;

import com.client.constant.CoreConstants;
import com.client.dto.request.auth.SignUpRequest;
import com.client.dto.request.auth.SignInRequest;
import com.client.dto.response.auth.SigninResponse;
import com.client.entities.Session;
import com.client.entities.User;
import com.client.exception.SessionNotFoundException;
import com.client.helper.MessageHelper;
import com.client.helper.ResponseHelper;
import com.client.repository.SessionRepository;
import com.client.repository.UserRepository;
import com.client.service.AuthService;
import com.client.utils.PasswordUtils;
import com.client.utils.ValidationUtils;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final SessionRepository sessionRepository;

    private final EntityManager entityManager;

    private final MessageHelper messageHelper;

    @Override
    public ResponseEntity<?> signIn(SignInRequest signinRequest) throws Exception {
        String username = signinRequest.getUsername();
        String rawPassword = signinRequest.getPassword();

        if (ValidationUtils.isNullOrEmpty(username)
        || ValidationUtils.isNullOrEmpty(rawPassword)) {
            throw new ValidationException(
                messageHelper.getMessage("client.authController.auth.error.validation")
            );
        }

        User fetchedUser = userRepository.findUserByUsername(username);
        if (fetchedUser == null) {
            return ResponseHelper.unauthorized(null, messageHelper.getMessage("client.authController.auth.error.unauthorized"));
        }

        if (!PasswordUtils.verifyPassword(rawPassword, fetchedUser.getPassword())) {
            return ResponseHelper.unauthorized(null, messageHelper.getMessage("client.authController.auth.error.unauthorized"));
        }

        closeAllPriorSessions(fetchedUser.getUserId());

        Session newSession = Session
                .builder()
                .sessionId(UUID.randomUUID().toString())
                .fromTime(LocalDateTime.now())
                .createUser(CoreConstants.USER.CLIENT)
                .userId(fetchedUser.getUserId())
                .createDatetime(LocalDateTime.now())
                .build();

        sessionRepository.save(newSession);
        return ResponseHelper.ok(SigninResponse.builder().user(fetchedUser).session(newSession).build(),
                HttpStatus.OK,
                messageHelper.getMessage("client.authController.auth.info.authorized"));
    }

    @Override
    public ResponseEntity<?> signUp(SignUpRequest signUpRequest) throws Exception {
        String username = signUpRequest.getUsername();
        String rawPassword = signUpRequest.getPassword();
        String email = signUpRequest.getEmail();
        String createUser = CoreConstants.USER.CLIENT;
        LocalDateTime createDatetime = LocalDateTime.now();

        if (ValidationUtils.isNullOrEmpty(username)) {
            throw new ValidationException(
                messageHelper.getMessage("client.authController.signUp.error.validation.username")
            );
        }
        if (ValidationUtils.isNullOrEmpty(rawPassword)) {
            throw new ValidationException(
                messageHelper.getMessage("client.authController.signUp.error.validation.password")
            );
        }

        User newUser = User
                .builder()
                .userId(UUID.randomUUID().toString())
                .username(username)
                .password(PasswordUtils.encryptPassword(rawPassword))
                .email(email)
                .createUser(createUser)
                .createDatetime(createDatetime)
                .build();

        userRepository.save(newUser);
        return ResponseHelper.ok(newUser, HttpStatus.OK, messageHelper.getMessage("client.authController.signUp.info.createUser.success"));
    }

    @Override
    public ResponseEntity<?> signOut(String sessionId) throws Exception {
        if (ValidationUtils.isNullOrEmpty(sessionId)) {
            throw new ValidationException(
                messageHelper.getMessage("client.authController.signOut.error.validation.sessionId")
            );
        }
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new SessionNotFoundException(
                    messageHelper.getMessage("client.authController.session.find.error.notFound")
                ));

        session.setToTime(LocalDateTime.now());
        sessionRepository.save(session);
        return ResponseHelper.ok(session, HttpStatus.OK, messageHelper.getMessage("client.authController.auth.info.leave"));
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
