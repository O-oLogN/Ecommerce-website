package com.admin.repository;

import com.admin.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDetailsRepository extends JpaRepository<User, String> {
    Optional<User> findUserByUsername(String username);
}
