package com.ecom.service.impl;

import com.ecom.constant.CoreConstants;
import com.ecom.dto.request.auth.CreateUserRequest;
import com.ecom.dto.request.user.SearchUserRequest;
import com.ecom.dto.request.user.UpdateUserRequest;
import com.ecom.entities.Role;
import com.ecom.entities.User;
import com.ecom.entities.UserRole;
import com.ecom.exception.UserNotFoundException;
import com.ecom.exception.UsernameAlreadyExistsException;
import com.ecom.helper.MessageHelper;
import com.ecom.helper.ResponseHelper;
import com.ecom.model.PageInfo;
import com.ecom.model.PagingResponse;
import com.ecom.model.QueryRequest;
import com.ecom.repository.RoleRepository;
import com.ecom.repository.UserRepository;
import com.ecom.repository.UserRoleRepository;
import com.ecom.service.UserService;
import com.ecom.specification.UserSpecification;
import com.ecom.utils.PasswordUtils;
import com.ecom.utils.SortUtils;
import com.ecom.utils.ValidationUtils;
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
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;

    private final UserSpecification userSpecification;

    private final MessageHelper messageHelper;

    @Override
    public ResponseEntity<?> createUser(CreateUserRequest createUserRequest) throws Exception {
        String username = createUserRequest.getUsername();
        String rawPassword = createUserRequest.getPassword();
        String email = createUserRequest.getEmail();
        List<String> roleIds = createUserRequest.getRoleIds();
        String createUser = CoreConstants.ROLE.ADMIN;
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

        User user = userRepository.findUserByUsername(username);
        if (user != null) {
            throw new UsernameAlreadyExistsException(
                    messageHelper.getMessage("admin.userController.createUser.error.duplicated.username")
            );
        }

        userRepository.save(newUser);       // Must to doing first

        Set<UserRole> newUserRoles = new HashSet<>();
        roleIds.forEach(roleId -> {
            UserRole newUserRole = UserRole
                .builder()
                .userRoleId(UUID.randomUUID().toString())
                .user(newUser)
                .role(roleRepository.findRoleByRoleId(roleId))
                .createUser(createUser)
                .createDatetime(createDatetime)
                .build();

            userRoleRepository.save(newUserRole);       // Then do this
            newUserRoles.add(newUserRole);
        });

        newUser.setUserRoles(newUserRoles);         // Update roles in response
        return ResponseHelper.ok(newUser, HttpStatus.OK, messageHelper.getMessage("admin.userController.createUser.info.success"));
    }

    @Override
    public ResponseEntity<?> updateUser(UpdateUserRequest updateUserRequest) throws Exception {
        String userId = updateUserRequest.getUserId();
        String username = updateUserRequest.getUsername();
        String email = updateUserRequest.getEmail();
        List<String> roleIds = updateUserRequest.getRoleIds();

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

        List<Role> roles = new ArrayList<>();
        roleIds.forEach(roleId ->
            roles.add(roleRepository.findRoleByRoleId(roleId))
        );
        User user = userRepository.findUserByUserId(userId);
        List<UserRole> newUserRoles = new ArrayList<>();
        roles.forEach(role ->
            newUserRoles.add(UserRole.builder()
                    .userRoleId(UUID.randomUUID().toString())
                    .user(user)
                    .role(role)
                    .createUser(CoreConstants.ROLE.ADMIN)
                    .createDatetime(LocalDateTime.now())
                    .build())
        );

        user.setUsername(username);
        user.setEmail(email);
        user.getUserRoles().addAll(newUserRoles);
        user.setModifyUser(CoreConstants.ROLE.ADMIN);
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
