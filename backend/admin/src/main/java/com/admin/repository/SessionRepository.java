package com.admin.repository;

import com.admin.entities.Session;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SessionRepository extends JpaRepository<Session, String> {
    Session findSessionBySessionId(@Size(max = 50) String sessionId);
}
