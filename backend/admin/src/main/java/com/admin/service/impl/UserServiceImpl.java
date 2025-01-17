package com.admin.service.impl;

import com.admin.constant.CoreConstants;
import com.admin.dto.request.auth.CreateUserRequest;
import com.admin.dto.request.user.SearchUserRequest;
import com.admin.dto.request.user.UpdateUserRequest;
import com.admin.entities.User;
import com.admin.exception.UserNotFoundException;
import com.admin.helper.MessageHelper;
import com.admin.helper.ResponseHelper;
import com.admin.model.PageInfo;
import com.admin.model.PagingResponse;
import com.admin.model.QueryRequest;
import com.admin.repository.UserRepository;
import com.admin.service.UserService;
import com.admin.specification.UserSpecification;
import com.admin.utils.PasswordUtils;
import com.admin.utils.SortUtils;
import com.admin.utils.ValidationUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.*;
import jakarta.xml.bind.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
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
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    private final UserSpecification userSpecification;

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
        PageInfo pageInfo = searchUserRequest.getPageInfo();

        Specification<User> specification = userSpecification.specification(username);
        Sort sort = SortUtils.buildSort(searchUserRequest.getOrders());

        Page<User> page = userRepository.findAll(specification, PageRequest.of(pageInfo.getPageNumber(), pageInfo.getPageSize(), sort));
        List<User> users = page.getContent();

        return ResponseHelper.ok(PagingResponse.<User>
                        builder()
                        .totalElements(page.getTotalElements())
                        .totalPages(page.getTotalPages())
                        .numberOfElements(users.size())
                        .pageNumber(pageInfo.getPageNumber())
                        .pageSize(pageInfo.getPageSize())
                        .content(users)
                        .build(),
                HttpStatus.OK, "");
    }
}
