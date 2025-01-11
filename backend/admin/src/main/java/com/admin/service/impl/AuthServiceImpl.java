package com.admin.service.impl;

import com.admin.constant.CoreConstants;
import com.admin.dto.request.auth.SignInRequest;
import com.admin.entities.Session;
import com.admin.entities.User;
import com.admin.exception.SessionNotFoundException;
import com.admin.helper.MessageHelper;
import com.admin.helper.ResponseHelper;
import com.admin.repository.SessionRepository;
import com.admin.repository.UserRepository;
import com.admin.service.AuthService;
import com.admin.utils.PasswordUtils;
import com.admin.utils.ValidationUtils;
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
                messageHelper.getMessage("admin.authController.auth.error.validation")
            );
        }

        User fetchedUser = userRepository.findUserByUsername(username);
        if (fetchedUser == null) {
            return ResponseHelper.unauthorized(null, messageHelper.getMessage("admin.authController.auth.error.unauthorized"));
        }

        if (!PasswordUtils.verifyPassword(rawPassword, fetchedUser.getPassword())) {
            return ResponseHelper.unauthorized(null, messageHelper.getMessage("admin.authController.auth.error.unauthorized"));
        }

        closeAllPriorSessions(fetchedUser.getUserId());

        Session newSession = Session
                .builder()
                .sessionId(UUID.randomUUID().toString())
                .fromTime(LocalDateTime.now())
                .createUser(CoreConstants.ADMINISTRATOR.ADMIN)
                .userId(fetchedUser.getUserId())
                .createDatetime(LocalDateTime.now())
                .build();

        sessionRepository.save(newSession);
        return ResponseHelper.ok(newSession, HttpStatus.ACCEPTED, messageHelper.getMessage("admin.authController.auth.info.authorized"));
    }

    @Override
    public ResponseEntity<?> signOut(String sessionId) throws Exception {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new SessionNotFoundException(
                    messageHelper.getMessage("admin.authController.auth.session.find.error.notFound")
                ));
        session.setToTime(LocalDateTime.now());
        sessionRepository.save(session);
        return ResponseHelper.ok(session, HttpStatus.ACCEPTED, messageHelper.getMessage("admin.authController.auth.info.leave"));
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
