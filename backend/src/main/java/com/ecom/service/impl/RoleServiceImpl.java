package com.ecom.service.impl;

import com.ecom.constant.CoreConstants;
import com.ecom.dto.role.SearchRoleRequest;
import com.ecom.dto.role.UpdateRoleRequest;
import com.ecom.entities.Role;
import com.ecom.exception.RoleNotFoundException;
import com.ecom.helper.MessageHelper;
import com.ecom.helper.ResponseHelper;
import com.ecom.model.PageInfo;
import com.ecom.model.PagingResponse;
import com.ecom.model.QueryRequest;
import com.ecom.repository.RoleRepository;
import com.ecom.service.RoleService;
import com.ecom.specification.RoleSpecification;
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
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

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
                .createUser(CoreConstants.ROLE.ADMIN)
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
        role.setModifyUser(CoreConstants.ROLE.ADMIN);
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

        roleRepository.delete(role);

        return ResponseHelper.ok(role, HttpStatus.OK, messageHelper.getMessage("admin.roleController.delete.info.success"));
    }
}
