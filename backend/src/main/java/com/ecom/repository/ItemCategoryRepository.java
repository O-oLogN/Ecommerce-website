package com.ecom.repository;

import com.ecom.entities.ItemCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ItemCategoryRepository extends JpaRepository<ItemCategory, String>, JpaSpecificationExecutor<ItemCategory> {
    ItemCategory findItemCategoryByCategoryId(String categoryId);
}
