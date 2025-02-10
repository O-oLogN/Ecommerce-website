package com.ecom.repository;

import com.ecom.entities.ItemHighlight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ItemHighlightRepository extends JpaRepository<ItemHighlight, String>, JpaSpecificationExecutor<ItemHighlight> {
}
