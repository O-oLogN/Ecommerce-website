package com.admin.service.impl;

import com.admin.constant.CoreConstants;
import com.admin.dto.role.SearchRoleRequest;
import com.admin.dto.role.UpdateRoleRequest;
import com.admin.entities.Role;
import com.admin.entities.UserRole;
import com.admin.exception.RoleNotFoundException;
import com.admin.helper.MessageHelper;
import com.admin.helper.ResponseHelper;
import com.admin.model.PageInfo;
import com.admin.model.PagingResponse;
import com.admin.model.QueryRequest;
import com.admin.repository.RoleRepository;
import com.admin.repository.UserRoleRepository;
import com.admin.service.RoleService;
import com.admin.specification.RoleSpecification;
import com.admin.utils.SortUtils;
import com.admin.utils.ValidationUtils;
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
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;

    private final RoleSpecification roleSpecification;

    private final MessageHelper messageHelper;

    @Override
    public ResponseEntity<?> searchRole(QueryRequest<SearchRoleRequest> searchRoleRequest) {
        String roleName = searchRoleRequest.getSample().getRoleName();
        PageInfo pageInfo = searchRoleRequest.getPageInfo();

        Specification<Role> specification = roleSpecification.specification(roleName);
        Sort sort = SortUtils.buildSort(searchRoleRequest.getOrders());

        Page<Role> page = roleRepository.findAll(specification, PageRequest.of(pageInfo.getPageNumber(), pageInfo.getPageSize(), sort));
        List<Role> roles = page.getContent();

        return ResponseHelper.ok(PagingResponse.<Role>
                        builder()
                        .totalElements(page.getTotalElements())
                        .totalPages(page.getTotalPages())
                        .numberOfElements(roles.size())
                        .pageNumber(pageInfo.getPageNumber())
                        .pageSize(pageInfo.getPageSize())
                        .content(roles)
                        .build(),
                HttpStatus.OK, "");
    }

    @Override
    public ResponseEntity<?> createRole(String roleName) throws Exception {
        if (ValidationUtils.isNullOrEmpty(roleName)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.roleController.create.error.validation")
            );
        }

        Role newRole = Role
                .builder()
                .roleId(UUID.randomUUID().toString())
                .name(roleName)
                .createDatetime(LocalDateTime.now())
                .createUser(CoreConstants.ADMINISTRATOR.ADMIN)
                .build();

        roleRepository.save(newRole);
        return ResponseHelper.ok(newRole, HttpStatus.OK, messageHelper.getMessage("admin.roleController.create.info.success"));
    }

    @Override
    public ResponseEntity<?> updateRole(UpdateRoleRequest updateRoleRequest) throws Exception {
        String roleId = updateRoleRequest.getRoleId();
        String roleName = updateRoleRequest.getName();

        if (ValidationUtils.isNullOrEmpty(roleId)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.roleController.update.error.validation.roleId")
            );
        }

        Role role = roleRepository.findById(roleId).orElse(null);
        if (role == null) {
            throw new RoleNotFoundException(
                messageHelper.getMessage("admin.roleController.update.role.find.error.notFound")
            );
        }

        role.setName(roleName);
        role.setModifyUser(CoreConstants.ADMINISTRATOR.ADMIN);
        role.setModifyDatetime(LocalDateTime.now());

        roleRepository.save(role);
        return ResponseHelper.ok(role, HttpStatus.OK, messageHelper.getMessage("admin.roleController.update.info.success"));
    }

    @Override
    public ResponseEntity<?> deleteRole(String roleId) throws Exception {
        if (ValidationUtils.isNullOrEmpty(roleId)) {
            throw new ValidationException(
                    messageHelper.getMessage("admin.roleController.delete.error.validation.roleId")
            );
        }

        Role role = roleRepository.findById(roleId).orElse(null);
        if (role == null) {
            throw new RoleNotFoundException(
                    messageHelper.getMessage("admin.roleController.delete.role.find.error.notFound")
            );
        }

        List<UserRole> userRoles = userRoleRepository.findUserRolesByRole(role);
        userRoleRepository.deleteAll(userRoles);
        roleRepository.delete(role);

        return ResponseHelper.ok(role, HttpStatus.OK, messageHelper.getMessage("admin.roleController.delete.info.success"));
    }
}
