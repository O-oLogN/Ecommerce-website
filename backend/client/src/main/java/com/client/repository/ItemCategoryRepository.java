package com.client.repository;

import com.client.entities.ItemCategory;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ItemCategoryRepository extends JpaRepository<ItemCategory, String> {
    ItemCategory findItemCategoryByCategoryId(String categoryId);
}
