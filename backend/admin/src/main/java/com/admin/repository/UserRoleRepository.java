package com.admin.repository;

import com.admin.entities.Role;
import com.admin.entities.User;
import com.admin.entities.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, String> {
    List<UserRole> findUserRolesByUser(User user);

    List<UserRole> findUserRolesByRole(Role role);
}
