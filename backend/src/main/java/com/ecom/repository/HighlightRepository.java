package com.ecom.repository;

import com.ecom.entities.Highlight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface HighlightRepository extends JpaRepository<Highlight, String>, JpaSpecificationExecutor<Highlight> {
}
