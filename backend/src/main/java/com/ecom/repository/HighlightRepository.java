package com.ecom.repository;

import com.ecom.entities.Highlight;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface HighlightRepository extends JpaRepository<Highlight, String>, JpaSpecificationExecutor<Highlight> {
    Highlight findHighlightByHighlightId(@Size(max = 50) String highlightId);
}
