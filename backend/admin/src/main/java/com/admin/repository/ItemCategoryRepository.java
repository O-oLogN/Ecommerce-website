package com.admin.repository;

import com.admin.entities.ItemCategory;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ItemCategoryRepository extends JpaRepository<ItemCategory, String>, JpaSpecificationExecutor<ItemCategory> {
    ItemCategory findItemCategoryByCategoryId(String categoryId);

    List<ItemCategory> findByNameContaining(@Size(max = 100) @NotNull String name);

}
