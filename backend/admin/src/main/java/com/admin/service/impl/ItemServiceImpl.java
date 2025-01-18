package com.admin.service.impl;

import com.admin.constant.CoreConstants;
import com.admin.dto.request.item.CreateItemRequest;
import com.admin.dto.request.item.SearchItemRequest;
import com.admin.dto.request.item.UpdateItemRequest;
import com.admin.entities.Item;
import com.admin.exception.ItemNotFoundException;
import com.admin.helper.MessageHelper;
import com.admin.helper.ResponseHelper;
import com.admin.model.OrderBy;
import com.admin.model.PageInfo;
import com.admin.model.PagingResponse;
import com.admin.model.QueryRequest;
import com.admin.repository.ItemRepository;
import com.admin.service.ItemService;
import com.admin.specification.ItemSpecification;
import com.admin.utils.SortUtils;
import com.admin.utils.ValidationUtils;
import jakarta.xml.bind.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ItemServiceImpl implements ItemService {
    private final ItemRepository itemRepository;

    private final ItemSpecification itemSpecification;

    private final MessageHelper messageHelper;

    @Override
    public ResponseEntity<?> searchItem(QueryRequest<SearchItemRequest> searchItemRequest) {
        String itemName = searchItemRequest.getSample().getItemName();
        PageInfo pageInfo = searchItemRequest.getPageInfo();
        List<OrderBy> orders = searchItemRequest.getOrders();

        Page<Item> page = itemRepository.findAll(
            itemSpecification.specification(itemName),
            PageRequest.of(
                    pageInfo.getPageNumber(),
                    pageInfo.getPageSize(),
                    SortUtils.buildSort(orders)
            )
        );
        List<Item> items = page.getContent();
        return ResponseHelper.ok(
            PagingResponse.<Item>builder()
                    .totalPages(page.getTotalPages())
                    .totalElements(page.getTotalElements())
                    .pageNumber(pageInfo.getPageNumber())
                    .pageSize(pageInfo.getPageSize())
                    .numberOfElements(page.getNumberOfElements())
                    .content(items)
                    .build(),
            HttpStatus.OK, ""
        );
    }

    @Override
    public ResponseEntity<?> createItem(CreateItemRequest createItemRequest) throws Exception {
        String categoryId = createItemRequest.getCategoryId();
        String name = createItemRequest.getName();
        Float price = createItemRequest.getPrice();
        MultipartFile image = null;
        if (!ValidationUtils.isNullOrEmpty(createItemRequest.getImage())) {
            image = createItemRequest.getImage();
        }
        Integer quantity = createItemRequest.getQuantity();
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
                .image(!ValidationUtils.isNullOrEmpty(image) ? image.getBytes() : null)
                .quantity(quantity)
                .createUser(createUser)
                .createDatetime(createDatetime)
                .build();

        itemRepository.save(newItem);

        return ResponseHelper.ok(newItem, HttpStatus.OK, messageHelper.getMessage("admin.itemController.create.info.success"));
    }

    @Override
    public ResponseEntity<?> updateItem(UpdateItemRequest updateItemRequest) throws Exception {
        String itemId = updateItemRequest.getItemId();
        String categoryId = updateItemRequest.getCategoryId();
        Float price = updateItemRequest.getPrice();
        String name = updateItemRequest.getName();
        MultipartFile image = null;
        if (!ValidationUtils.isNullOrEmpty(updateItemRequest.getImage())) {
            image = updateItemRequest.getImage();
        }
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
                .image(!ValidationUtils.isNullOrEmpty(image) ? image.getBytes() : null)
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
