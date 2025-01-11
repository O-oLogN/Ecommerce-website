package com.admin.repository;

import com.admin.entities.ItemCategory;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ItemCategoryRepository extends JpaRepository<ItemCategory, String> {
    ItemCategory findItemCategoryByCategoryId(String categoryId);

    List<ItemCategory> findByNameContaining(@Size(max = 100) @NotNull String name);
}
