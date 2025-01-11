package com.client.service.impl;

import com.client.constant.CoreConstants;
import com.client.dto.request.user.UpdateUserRequest;
import com.client.entities.User;
import com.client.exception.UserNotFoundException;
import com.client.helper.MessageHelper;
import com.client.helper.ResponseHelper;
import com.client.repository.UserRepository;
import com.client.service.UserService;
import com.client.utils.ValidationUtils;
import jakarta.xml.bind.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    private final MessageHelper messageHelper;

    @Override
    public ResponseEntity<?> updateUser(UpdateUserRequest updateUserRequest) throws Exception {
        String userId = updateUserRequest.getUserId();
        String username = updateUserRequest.getUsername();
        String email = updateUserRequest.getEmail();

        if (ValidationUtils.isNullOrEmpty(userId)) {
            throw new ValidationException(
                messageHelper.getMessage("client.userController.update.error.validation.userId")
            );
        }
        if (ValidationUtils.isNullOrEmpty(username)) {
            throw new ValidationException(
                messageHelper.getMessage("client.userController.update.error.validation.username")
            );
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(
                    messageHelper.getMessage("client.userController.update.user.find.error.notFound")
                ));
        user.setUsername(username);
        user.setEmail(email);
        user.setModifyUser(CoreConstants.USER.CLIENT);
        user.setModifyDatetime(LocalDateTime.now());

        userRepository.save(user);
        return ResponseHelper.ok(user, HttpStatus.OK, messageHelper.getMessage("client.userController.update.info.success"));
    }
}
