package com.admin.repository;

import com.admin.entities.Role;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RoleRepository extends JpaRepository<Role, String>, JpaSpecificationExecutor<Role> {
    Role findRoleByRoleId(@Size(max = 50) String roleId);
}
