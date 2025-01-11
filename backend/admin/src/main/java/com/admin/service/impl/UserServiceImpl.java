package com.admin.service.impl;

import com.admin.constant.CoreConstants;
import com.admin.dto.request.auth.CreateUserRequest;
import com.admin.dto.request.user.SearchUserRequest;
import com.admin.dto.request.user.UpdateUserRequest;
import com.admin.dto.response.user.UserResponse;
import com.admin.entities.User;
import com.admin.exception.UserNotFoundException;
import com.admin.helper.MessageHelper;
import com.admin.helper.ResponseHelper;
import com.admin.model.OrderBy;
import com.admin.model.QueryRequest;
import com.admin.repository.UserRepository;
import com.admin.service.UserService;
import com.admin.utils.PasswordUtils;
import com.admin.utils.ValidationUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.*;
import jakarta.xml.bind.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    private final EntityManager entityManager;

    private final MessageHelper messageHelper;

    @Override
    public ResponseEntity<?> createUser(CreateUserRequest createUserRequest) throws Exception {
        String username = createUserRequest.getUsername();
        String rawPassword = createUserRequest.getPassword();
        String email = createUserRequest.getEmail();
        String createUser = CoreConstants.ADMINISTRATOR.ADMIN;
        LocalDateTime createDatetime = LocalDateTime.now();

        if (ValidationUtils.isNullOrEmpty(username)) {
            throw new ValidationException(
                    messageHelper.getMessage("admin.userController.createUser.error.validation.username")
            );
        }
        if (ValidationUtils.isNullOrEmpty(rawPassword)) {
            throw new ValidationException(
                    messageHelper.getMessage("admin.userController.createUser.error.validation.password")
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
        return ResponseHelper.ok(newUser, HttpStatus.CREATED, messageHelper.getMessage("admin.userController.createUser.info.success"));
    }

    @Override
    public ResponseEntity<?> updateUser(UpdateUserRequest updateUserRequest) throws Exception {
        String userId = updateUserRequest.getUserId();
        String username = updateUserRequest.getUsername();
        String email = updateUserRequest.getEmail();

        if (ValidationUtils.isNullOrEmpty(userId)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.userController.update.error.validation.userId")
            );
        }
        if (ValidationUtils.isNullOrEmpty(username)) {
            throw new ValidationException(
                    messageHelper.getMessage("admin.userController.update.error.validation.username")
            );
        }

        User user = userRepository.findUserByUserId(userId);
        user.setUsername(username);
        user.setEmail(email);
        user.setModifyUser(CoreConstants.ADMINISTRATOR.ADMIN);
        user.setModifyDatetime(LocalDateTime.now());

        userRepository.save(user);
        return ResponseHelper.ok(user, HttpStatus.OK, messageHelper.getMessage("admin.userController.update.info.success"));
    }

    @Override
    public ResponseEntity<?> deleteUser(String userId) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(
                    messageHelper.getMessage("admin.userController.delete.user.find.error.notFound")
                ));
        userRepository.delete(user);
        return ResponseHelper.ok(user, HttpStatus.OK, messageHelper.getMessage("admin.userController.delete.info.success"));
    }

    @Override
    public ResponseEntity<?> searchUser(QueryRequest<SearchUserRequest> searchUserRequest) {
        String username = searchUserRequest.getSample().getUsername();

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<User> cq = cb.createQuery(User.class);

        Root<User> u = cq.from(User.class);

        Predicate predicate;
        if (ValidationUtils.isNullOrEmpty(username)) {
            predicate = cb.conjunction();
        } else {
            predicate = cb.like(u.get("username"), "%" + username + "%");
        }

        cq.where(predicate);

        if (!ValidationUtils.isNullOrEmpty(searchUserRequest.getOrders())) {
            List<Order> orderList = new ArrayList<>();
            for (OrderBy orderBy : searchUserRequest.getOrders()) {
                if ("ASC".equalsIgnoreCase(orderBy.getDirection())) {
                    orderList.add(cb.asc(u.get(orderBy.getProperty())));
                } else if ("DESC".equalsIgnoreCase(orderBy.getDirection())) {
                    orderList.add(cb.desc(u.get(orderBy.getProperty())));
                }
            }
            cq.orderBy(orderList);
        }

        List<User> users = entityManager.createQuery(cq).getResultList();
        return ResponseHelper.ok(UserResponse
                .builder()
                .size(users.size())
                .users(users)
                .build(),
            HttpStatus.OK, "");
    }
}
