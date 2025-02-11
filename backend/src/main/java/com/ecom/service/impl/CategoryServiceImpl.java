package com.ecom.service.impl;

import com.ecom.constant.CoreConstants;
import com.ecom.dto.request.category.CreateCategoryRequest;
import com.ecom.dto.request.category.SearchCategoryRequestByName;
import com.ecom.dto.request.category.UpdateCategoryRequest;
import com.ecom.entities.Category;
import com.ecom.exception.CategoryNotFoundException;
import com.ecom.exception.UserNotFoundException;
import com.ecom.helper.MessageHelper;
import com.ecom.helper.ResponseHelper;
import com.ecom.model.OrderBy;
import com.ecom.model.PageInfo;
import com.ecom.model.PagingResponse;
import com.ecom.model.QueryRequest;
import com.ecom.repository.CategoryRepository;
import com.ecom.service.CategoryService;
import com.ecom.specification.CategorySpecification;
import com.ecom.utils.SortUtils;
import com.ecom.utils.ValidationUtils;
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
    private final CategoryRepository categoryRepository;

    private final CategorySpecification categorySpecification;

    private final MessageHelper messageHelper;

    @Override
    public ResponseEntity<?> createCategory(CreateCategoryRequest createCategoryRequest) throws Exception {
        String categoryId = UUID.randomUUID().toString();
        String code = createCategoryRequest.getCode();
        String name = createCategoryRequest.getName();
        String createUser = CoreConstants.ROLE.ADMIN;
        LocalDateTime createDatetime = LocalDateTime.now();

        if (ValidationUtils.isNullOrEmpty(name)) {
            throw new ValidationException(
                  messageHelper.getMessage("admin.categoryController.create.error.validation.name")
            );
        }

         Category newCategory = Category
                 .builder()
                 .categoryId(categoryId)
                 .code(code)
                 .name(name)
                 .createUser(createUser)
                 .createDatetime(createDatetime)
                 .build();

        categoryRepository.save(newCategory);
        return ResponseHelper.ok(newCategory, HttpStatus.OK, messageHelper.getMessage("admin.categoryController.create.info.success"));
    }

    @Override
    public ResponseEntity<?> searchCategoryByName(QueryRequest<SearchCategoryRequestByName> searchCategoryRequest) {
        String categoryName = searchCategoryRequest.getSample().getCategoryName();
        PageInfo pageInfo = searchCategoryRequest.getPageInfo();
        List<OrderBy> orders = searchCategoryRequest.getOrders();

        Page<Category> page = categoryRepository.findAll(
                categorySpecification.specification(categoryName),
                PageRequest.of(
                        pageInfo.getPageNumber(),
                        pageInfo.getPageSize(),
                        SortUtils.buildSort(orders)
                )
        );
        List<Category> categories = page.getContent();

        return ResponseHelper.ok(
                PagingResponse.<Category>builder()
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
            categoryRepository.findItemCategoryByCategoryId(categoryId),
            HttpStatus.OK, ""
        );
    }

    @Override
    public ResponseEntity<?> updateCategory(UpdateCategoryRequest updateCategoryRequest) throws Exception {
        String categoryId = updateCategoryRequest.getCategoryId();
        String code = updateCategoryRequest.getCode();
        String name = updateCategoryRequest.getName();
        String modifyUser = CoreConstants.ROLE.ADMIN;
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

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new UserNotFoundException(
                    messageHelper.getMessage("admin.categoryController.update.category.find.error.notFound")
                ));

        category.setCode(code);
        category.setName(name);
        category.setModifyUser(modifyUser);
        category.setModifyDatetime(modifyDatetime);

        categoryRepository.save(category);
        return ResponseHelper.ok(category, HttpStatus.OK, messageHelper.getMessage("admin.categoryController.update.info.success"));
    }

    @Override
    public ResponseEntity<?> deleteCategory(String categoryId) throws Exception {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException(
                    messageHelper.getMessage("admin.categoryController.update.category.find.error.notFound")
                ));
        categoryRepository.delete(category);
        return ResponseHelper.ok(category, HttpStatus.OK, messageHelper.getMessage("admin.categoryController.delete.info.success"));
    }
}
