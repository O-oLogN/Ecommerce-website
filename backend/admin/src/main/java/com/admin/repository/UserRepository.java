package com.admin.repository;

import com.admin.entities.User;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findUserByUsername(String username);

    User findUserByUserId(@Size(max = 50) String userId);

    List<User> findByUsernameContaining(@Size(max = 100) @NotNull String username);
}
