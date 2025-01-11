package com.admin.service.impl;

import com.admin.constant.CoreConstants;
import com.admin.dto.request.category.CreateCategoryRequest;
import com.admin.dto.request.category.SearchCategoryRequest;
import com.admin.dto.request.category.UpdateCategoryRequest;
import com.admin.dto.response.category.ItemCategoryResponse;
import com.admin.entities.ItemCategory;
import com.admin.exception.CategoryNotFoundException;
import com.admin.exception.UserNotFoundException;
import com.admin.helper.MessageHelper;
import com.admin.helper.ResponseHelper;
import com.admin.model.OrderBy;
import com.admin.model.QueryRequest;
import com.admin.repository.ItemCategoryRepository;
import com.admin.service.CategoryService;
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
public class CategoryServiceImpl implements CategoryService {
    private final ItemCategoryRepository itemCategoryRepository;

    private final EntityManager entityManager;

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
    public ResponseEntity<?> searchCategory(QueryRequest<SearchCategoryRequest> searchCategoryRequest) {
        String categoryName = searchCategoryRequest.getSample().getKeyword();

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<ItemCategory> cq = cb.createQuery(ItemCategory.class);

        Root<ItemCategory> ic = cq.from(ItemCategory.class);

        Predicate predicate;
        if (ValidationUtils.isNullOrEmpty(categoryName)) {
            predicate = cb.conjunction();
        } else {
            predicate = cb.like(ic.get("name"), "%" + categoryName + "%");
        }

        cq.where(predicate);

        if (!ValidationUtils.isNullOrEmpty(searchCategoryRequest.getOrders())) {
            List<Order> orderList = new ArrayList<>();
            for (OrderBy orderBy : searchCategoryRequest.getOrders()) {
                if ("ASC".equalsIgnoreCase(orderBy.getDirection())) {
                    orderList.add(cb.asc(ic.get(orderBy.getProperty())));
                } else if ("DESC".equalsIgnoreCase(orderBy.getDirection())) {
                    orderList.add(cb.desc(ic.get(orderBy.getProperty())));
                }
            }
            cq.orderBy(orderList);
        }

        List<ItemCategory> categories = entityManager.createQuery(cq).getResultList();

        return ResponseHelper.ok(ItemCategoryResponse
                .builder()
                .size(categories.size())
                .categories(categories)
                .build()
                , HttpStatus.OK, "");
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
