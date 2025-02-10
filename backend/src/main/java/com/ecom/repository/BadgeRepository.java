package com.ecom.repository;

import com.ecom.entities.Badge;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface BadgeRepository extends JpaRepository<Badge, String>, JpaSpecificationExecutor<Badge> {
    Badge findBadgeByBadgeId(@Size(max = 50) String badgeId);
}
