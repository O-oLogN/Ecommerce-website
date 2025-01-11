package com.client.repository;

import com.client.entities.User;

import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findUserByUsername(String username);

    User findUserByUserId(@Size(max = 50) String userId);
}
