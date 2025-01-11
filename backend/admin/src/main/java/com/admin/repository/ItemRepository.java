package com.admin.repository;

import com.admin.entities.Item;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ItemRepository extends JpaRepository<Item, String> {

    Item findItemByItemId(@Size(max = 50) String itemId);

    List<Item> findByNameContaining(@Size(max = 100) @NotNull String name);
}
