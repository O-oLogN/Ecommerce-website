package com.ecom.repository;

import com.ecom.entities.Role;
import com.ecom.entities.User;
import com.ecom.entities.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, String> {
    List<UserRole> findUserRolesByUser(User user);

    List<UserRole> findUserRolesByRole(Role role);
}
