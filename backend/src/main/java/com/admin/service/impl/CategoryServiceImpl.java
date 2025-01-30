package com.admin.service.impl;

import com.admin.constant.CoreConstants;
import com.admin.dto.request.category.CreateCategoryRequest;
import com.admin.dto.request.category.SearchCategoryRequestByName;
import com.admin.dto.request.category.UpdateCategoryRequest;
import com.admin.entities.ItemCategory;
import com.admin.exception.CategoryNotFoundException;
import com.admin.exception.UserNotFoundException;
import com.admin.helper.MessageHelper;
import com.admin.helper.ResponseHelper;
import com.admin.model.OrderBy;
import com.admin.model.PageInfo;
import com.admin.model.PagingResponse;
import com.admin.model.QueryRequest;
import com.admin.repository.ItemCategoryRepository;
import com.admin.service.CategoryService;
import com.admin.specification.CategorySpecification;
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

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class CategoryServiceImpl implements CategoryService {
    private final ItemCategoryRepository itemCategoryRepository;

    private final CategorySpecification categorySpecification;

    private final MessageHelper messageHelper;

    @Override
    public ResponseEntity<?> createCategory(CreateCategoryRequest createCategoryRequest) throws Exception {
        String categoryId = UUID.randomUUID().toString();
        String code = createCategoryRequest.getCode();
        String name = createCategoryRequest.getName();
        String createUser = CoreConstants.ADMINISTRATOR.ADMIN;
        LocalDateTime createDatetime = LocalDateTime.now();

        if (ValidationUtils.isNullOrEmpty(name)) {
            throw new ValidationException(
                  messageHelper.getMessage("admin.categoryController.create.error.validation.name")
            );
        }

         ItemCategory newCategory = ItemCategory
                 .builder()
                 .categoryId(categoryId)
                 .code(code)
                 .name(name)
                 .createUser(createUser)
                 .createDatetime(createDatetime)
                 .build();

        itemCategoryRepository.save(newCategory);
        return ResponseHelper.ok(newCategory, HttpStatus.OK, messageHelper.getMessage("admin.categoryController.create.info.success"));
    }

    @Override
    public ResponseEntity<?> searchCategoryByName(QueryRequest<SearchCategoryRequestByName> searchCategoryRequest) {
        String categoryName = searchCategoryRequest.getSample().getCategoryName();
        PageInfo pageInfo = searchCategoryRequest.getPageInfo();
        List<OrderBy> orders = searchCategoryRequest.getOrders();

        Page<ItemCategory> page = itemCategoryRepository.findAll(
                categorySpecification.specification(categoryName),
                PageRequest.of(
                        pageInfo.getPageNumber(),
                        pageInfo.getPageSize(),
                        SortUtils.buildSort(orders)
                )
        );
        List<ItemCategory> categories = page.getContent();

        return ResponseHelper.ok(
                PagingResponse.<ItemCategory>builder()
                        .totalPages(page.getTotalPages())
                        .totalElements(page.getTotalElements())
                        .pageNumber(pageInfo.getPageNumber())
                        .pageSize(pageInfo.getPageSize())
                        .numberOfElements(page.getNumberOfElements())
                        .content(categories)
                        .build(),
                HttpStatus.OK, ""
        );
    }
    
    @Override
    public ResponseEntity<?> searchCategoryById(String categoryId) throws Exception {
        if (ValidationUtils.isNullOrEmpty(categoryId)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.categoryController.search.error.validation.categoryId")
            );
        }
        return ResponseHelper.ok(
            itemCategoryRepository.findItemCategoryByCategoryId(categoryId),
            HttpStatus.OK, ""
        );
    }

    @Override
    public ResponseEntity<?> updateCategory(UpdateCategoryRequest updateCategoryRequest) throws Exception {
        String categoryId = updateCategoryRequest.getCategoryId();
        String code = updateCategoryRequest.getCode();
        String name = updateCategoryRequest.getName();
        String modifyUser = CoreConstants.ADMINISTRATOR.ADMIN;
        LocalDateTime modifyDatetime = LocalDateTime.now();

        if (ValidationUtils.isNullOrEmpty(categoryId)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.categoryController.update.error.validation.categoryId")
            );
        }
        if (ValidationUtils.isNullOrEmpty(name)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.categoryController.update.error.validation.name")
            );
        }

        ItemCategory category = itemCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new UserNotFoundException(
                    messageHelper.getMessage("admin.categoryController.update.category.find.error.notFound")
                ));

        category.setCode(code);
        category.setName(name);
        category.setModifyUser(modifyUser);
        category.setModifyDatetime(modifyDatetime);

        itemCategoryRepository.save(category);
        return ResponseHelper.ok(category, HttpStatus.OK, messageHelper.getMessage("admin.categoryController.update.info.success"));
    }

    @Override
    public ResponseEntity<?> deleteCategory(String categoryId) throws Exception {
        ItemCategory category = itemCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException(
                    messageHelper.getMessage("admin.categoryController.update.category.find.error.notFound")
                ));
        itemCategoryRepository.delete(category);
        return ResponseHelper.ok(category, HttpStatus.OK, messageHelper.getMessage("admin.categoryController.delete.info.success"));
    }
}
