package com.admin.repository;

import com.admin.entities.Item;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface ItemRepository extends JpaRepository<Item, String>, JpaSpecificationExecutor<Item> {

    Item findItemByItemId(@Size(max = 50) String itemId);

}
