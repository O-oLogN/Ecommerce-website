package com.ecom.service.impl;

import com.ecom.constant.CoreConstants;
import com.ecom.dto.request.item.CreateItemRequest;
import com.ecom.dto.request.item.SearchItemRequest;
import com.ecom.dto.request.item.UpdateItemRequest;
import com.ecom.dto.response.minio.EditFileResponse;
import com.ecom.dto.response.minio.UploadFileResponse;
import com.ecom.entities.Item;
import com.ecom.entities.ItemBadge;
import com.ecom.entities.ItemHighlight;
import com.ecom.exception.ItemNotFoundException;
import com.ecom.helper.MessageHelper;
import com.ecom.helper.ResponseHelper;
import com.ecom.model.OrderBy;
import com.ecom.model.PageInfo;
import com.ecom.model.PagingResponse;
import com.ecom.model.QueryRequest;
import com.ecom.repository.*;
import com.ecom.service.ItemService;
import com.ecom.service.MinioService;
import com.ecom.specification.ItemSpecification;
import com.ecom.utils.SortUtils;
import com.ecom.utils.ValidationUtils;
import io.github.cdimascio.dotenv.Dotenv;
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
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ItemServiceImpl implements ItemService {
    private final MinioService minioService;

    private final ItemRepository itemRepository;
    private final HighlightRepository highlightRepository;
    private final BadgeRepository badgeRepository;

    private final ItemSpecification itemSpecification;

    private final MessageHelper messageHelper;

    private final Dotenv dotenv = Dotenv.load();

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
        String itemId = UUID.randomUUID().toString();
        String categoryId = createItemRequest.getCategoryId();
        String name = createItemRequest.getName();
        Float price = createItemRequest.getPrice();
        MultipartFile image = createItemRequest.getImage();
        Integer quantity = createItemRequest.getQuantity();
        List<String> badgeIds = createItemRequest.getBadgeIds();
        List<String> highlightIds = createItemRequest.getHighlightIds();
        Float rate = createItemRequest.getRate();
        Integer numberOfReviews = createItemRequest.getNumberOfReviews();
        String createUser = CoreConstants.ROLE.ADMIN;
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

        UploadFileResponse uploadFileResponse = null;
        if (!ValidationUtils.isNullOrEmpty(image)) {
            uploadFileResponse = minioService.uploadFile(image, dotenv.get("MINIO_IMAGE_UPLOAD_DIR"));
        }

        Item newItem = Item
                .builder()
                .itemId(itemId)
                .categoryId(categoryId)
                .name(name)
                .price(price)
                .imageMinioGetUrl(ValidationUtils.isNullOrEmpty(uploadFileResponse) ? "" : uploadFileResponse.getPresignedGetUrl())
                .imageMinioPutUrl(ValidationUtils.isNullOrEmpty(uploadFileResponse) ? "" : uploadFileResponse.getPresignedPutUrl())
                .quantity(quantity)
                .rate(rate)
                .numberOfReviews(numberOfReviews)
                .createUser(createUser)
                .createDatetime(createDatetime)
                .build();

        itemRepository.save(newItem);

        newItem.setItemHighlights(convertHighlightIdsToSetItemHighlight(newItem, highlightIds));
        newItem.setItemBadges(convertBadgeIdsToSetItemBadge(newItem, badgeIds));

        itemRepository.save(newItem);

        return ResponseHelper.ok(newItem, HttpStatus.OK, messageHelper.getMessage("admin.itemController.create.info.success"));
    }

    @Override
    public ResponseEntity<?> updateItem(UpdateItemRequest updateItemRequest) throws Exception {
        String itemId = updateItemRequest.getItemId();
        String categoryId = updateItemRequest.getCategoryId();
        Float price = updateItemRequest.getPrice();
        String name = updateItemRequest.getName();
        Integer quantity = updateItemRequest.getQuantity();
        MultipartFile image = updateItemRequest.getImage();
        String oldImageMinioPutUrl = updateItemRequest.getImageMinioPutUrl();
        List<String> highlightIds = updateItemRequest.getHighlightIds();
        List<String> badgeIds = updateItemRequest.getBadgeIds();
        Float rate = updateItemRequest.getRate();
        Integer numberOfReviews = updateItemRequest.getNumberOfReviews();
        String modifyUser = CoreConstants.ROLE.ADMIN;
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

        Item item = itemRepository.findItemByItemId(itemId);
        String newImageMinioGetUrl = item.getImageMinioGetUrl();
        String newImageMinioPutUrl = item.getImageMinioPutUrl();

        if (!ValidationUtils.isNullOrEmpty(image)) {
            if (ValidationUtils.isNullOrEmpty(oldImageMinioPutUrl)) {
                UploadFileResponse uploadFileResponse = minioService.uploadFile(image, dotenv.get("MINIO_IMAGE_UPLOAD_DIR"));
                newImageMinioPutUrl = uploadFileResponse.getPresignedPutUrl();
                newImageMinioGetUrl = uploadFileResponse.getPresignedGetUrl();
            }
            else {
                EditFileResponse editFileResponse = minioService.editFile(image, dotenv.get("MINIO_IMAGE_UPLOAD_DIR"), oldImageMinioPutUrl);
                newImageMinioPutUrl = editFileResponse.getPresignedPutUrl();
                newImageMinioGetUrl = editFileResponse.getPresignedGetUrl();
            }
        }

        Set<ItemHighlight> newItemHighlights = convertHighlightIdsToSetItemHighlight(item, highlightIds);
        Set<ItemBadge> newItemBadges = convertBadgeIdsToSetItemBadge(item, badgeIds);
        item.getItemHighlights().addAll(newItemHighlights);
        item.getItemBadges().addAll(newItemBadges);

        item.setCategoryId(categoryId);
        item.setName(name);
        item.setPrice(price);
        item.setQuantity(quantity);
        item.setImageMinioGetUrl(newImageMinioGetUrl);
        item.setImageMinioPutUrl(newImageMinioPutUrl);
        item.setRate(rate);
        item.setNumberOfReviews(numberOfReviews);
        item.setModifyUser(modifyUser);
        item.setModifyDatetime(modifyDatetime);
        item.getItemHighlights().removeIf(itemHighlight -> !newItemHighlights.contains(itemHighlight));
        item.getItemBadges().removeIf(itemBadge -> !newItemBadges.contains(itemBadge));
        itemRepository.save(item);

        return ResponseHelper.ok(item, HttpStatus.OK, messageHelper.getMessage("admin.itemController.update.info.success"));
    }

    @Override
    public ResponseEntity<?> deleteItem(String itemId) throws Exception {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ItemNotFoundException(
                    messageHelper.getMessage("admin.itemController.delete.item.find.error.notFound")
                ));

        String imageMinioPutUrl = item.getImageMinioPutUrl();
        if (!ValidationUtils.isNullOrEmpty(imageMinioPutUrl)) {
            minioService.deleteFile(imageMinioPutUrl);          // Delete image in Min.io
        }

        itemRepository.deleteById(itemId);

        return ResponseHelper.ok(item, HttpStatus.OK, messageHelper.getMessage("admin.itemController.delete.info.success"));
    }

/*==============================================================================PRIVATE METHODS=========================================================================================================*/
    private Set<ItemHighlight> convertHighlightIdsToSetItemHighlight(Item item, List<String> highlightIds) {
        return highlightIds.stream()
                .map(highlightId -> ItemHighlight.builder()
                        .itemHighlightId(UUID.randomUUID().toString())
                        .item(item)
                        .highlight(highlightRepository.findHighlightByHighlightId(highlightId))
                        .createUser(CoreConstants.ROLE.ADMIN)
                        .createDatetime(LocalDateTime.now())
                        .build()
                )
                .collect(Collectors.toSet());
    }

    private Set<ItemBadge> convertBadgeIdsToSetItemBadge(Item item, List<String> badgeIds) {
        return badgeIds.stream()
                .map(badgeId -> ItemBadge.builder()
                        .itemBadgeId(UUID.randomUUID().toString())
                        .item(item)
                        .badge(badgeRepository.findBadgeByBadgeId(badgeId))
                        .createUser(CoreConstants.ROLE.ADMIN)
                        .createDatetime(LocalDateTime.now())
                        .build()
                )
                .collect(Collectors.toSet());
    }
}



