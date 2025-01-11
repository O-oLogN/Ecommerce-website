package com.admin.service.impl;

import com.admin.constant.CoreConstants;
import com.admin.dto.request.item.CreateItemsRequest;
import com.admin.dto.request.item.SearchItemRequest;
import com.admin.dto.request.item.UpdateItemRequest;
import com.admin.dto.response.item.ItemResponse;
import com.admin.entities.Item;
import com.admin.exception.ItemNotFoundException;
import com.admin.helper.MessageHelper;
import com.admin.helper.ResponseHelper;
import com.admin.model.NewItem;
import com.admin.model.OrderBy;
import com.admin.model.QueryRequest;
import com.admin.repository.ItemRepository;
import com.admin.service.ItemService;
import com.admin.utils.ValidationUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.*;
import jakarta.xml.bind.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ItemServiceImpl implements ItemService {
    private final ItemRepository itemRepository;

    private final EntityManager entityManager;

    private final MessageHelper messageHelper;

    @Override
    public ResponseEntity<?> searchItem(QueryRequest<SearchItemRequest> searchItemRequest) {
        String itemName = searchItemRequest.getSample().getItemName();

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Item> cq = cb.createQuery(Item.class);

        Root<Item> it = cq.from(Item.class);

        Predicate predicate;
        if (ValidationUtils.isNullOrEmpty(itemName)) {
            predicate = cb.conjunction();
        } else {
            predicate = cb.like(it.get("name"), "%" + itemName + "%");
        }

        cq.where(predicate);

        if (!ValidationUtils.isNullOrEmpty(searchItemRequest.getOrders())) {
            List<Order> orderList = new ArrayList<>();
            for (OrderBy orderBy : searchItemRequest.getOrders()) {
                if ("ASC".equalsIgnoreCase(orderBy.getDirection())) {
                    orderList.add(cb.asc(it.get(orderBy.getProperty())));
                } else if ("DESC".equalsIgnoreCase(orderBy.getDirection())) {
                    orderList.add(cb.desc(it.get(orderBy.getProperty())));
                }
            }
            cq.orderBy(orderList);
        }

        List<Item> items = entityManager.createQuery(cq).getResultList();
        return ResponseHelper.ok(ItemResponse
                .builder()
                .size(items.size())
                .items(items)
                .build(),
            HttpStatus.OK, "");
    }

    @Override
    public ResponseEntity<?> createItem(CreateItemsRequest createItemsRequest) throws Exception {
        List<Item> newItems = new ArrayList<>();

        for (NewItem item : createItemsRequest.getItems()) {
            String categoryId = item.getCategoryId();
            String name = item.getName();
            Float price = item.getPrice();
            String imageUrl = item.getImageUrl();
            Integer quantity = item.getQuantity();
            String createUser = CoreConstants.ADMINISTRATOR.ADMIN;
            LocalDateTime createDatetime = LocalDateTime.now();

            if (ValidationUtils.isNullOrEmpty(categoryId)) {
                throw new ValidationException(
                        messageHelper.getMessage("admin.itemController.create.error.validation.categoryId")
                );
            }
            if (ValidationUtils.isNullOrEmpty(name)) {
                throw new ValidationException(
                        messageHelper.getMessage("admin.itemController.create.error.validation.name")
                );
            }
            if (ValidationUtils.isNullOrEmpty(quantity)) {
                throw new ValidationException(
                        messageHelper.getMessage("admin.itemController.create.error.validation.quantity")
                );
            }

            Item newItem = Item
                    .builder()
                    .itemId(UUID.randomUUID().toString())
                    .categoryId(categoryId)
                    .name(name)
                    .price(price)
                    .imageUrl(imageUrl)
                    .quantity(quantity)
                    .createUser(createUser)
                    .createDatetime(createDatetime)
                    .build();

            itemRepository.save(newItem);
            newItems.add(newItem);
        }
        return ResponseHelper.ok(newItems, HttpStatus.CREATED, messageHelper.getMessage("admin.itemController.create.info.success"));
    }

    @Override
    public ResponseEntity<?> updateItem(UpdateItemRequest updateItemRequest) throws Exception {
        String itemId = updateItemRequest.getItemId();
        String categoryId = updateItemRequest.getCategoryId();
        String name = updateItemRequest.getName();
        float price = updateItemRequest.getPrice();
        String imageUrl = updateItemRequest.getImageUrl();
        Integer quantity = updateItemRequest.getQuantity();
        String modifyUser = CoreConstants.ADMINISTRATOR.ADMIN;
        LocalDateTime modifyDatetime = LocalDateTime.now();

        if (ValidationUtils.isNullOrEmpty(itemId)) {
            throw new ValidationException(
                    messageHelper.getMessage("admin.itemController.update.error.validation.itemId")
            );
        }
        if (ValidationUtils.isNullOrEmpty(categoryId)) {
            throw new ValidationException(
                    messageHelper.getMessage("admin.itemController.update.error.validation.categoryId")
            );
        }
        if (ValidationUtils.isNullOrEmpty(name)) {
            throw new ValidationException(
                    messageHelper.getMessage("admin.itemController.update.error.validation.name")
            );
        }
        if (ValidationUtils.isNullOrEmpty(quantity)) {
            throw new ValidationException(
                    messageHelper.getMessage("admin.itemController.update.error.validation.quantity")
            );
        }

        Item updatedItem = Item
                .builder()
                .itemId(itemId)
                .categoryId(categoryId)
                .name(name)
                .price(price)
                .imageUrl(imageUrl)
                .quantity(quantity)
                .createUser(itemRepository.findItemByItemId(itemId).getCreateUser())
                .createDatetime(itemRepository.findItemByItemId(itemId).getCreateDatetime())
                .modifyUser(modifyUser)
                .modifyDatetime(modifyDatetime)
                .build();

        itemRepository.save(updatedItem);
        return ResponseHelper.ok(updatedItem, HttpStatus.OK, messageHelper.getMessage("admin.itemController.update.info.success"));
    }

    @Override
    public ResponseEntity<?> deleteItem(String itemId) throws Exception {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ItemNotFoundException(
                    messageHelper.getMessage("admin.itemController.delete.item.find.error.notFound")
                ));
        itemRepository.deleteById(itemId);
        return ResponseHelper.ok(item, HttpStatus.OK, messageHelper.getMessage("admin.itemController.delete.info.success"));
    }
}
