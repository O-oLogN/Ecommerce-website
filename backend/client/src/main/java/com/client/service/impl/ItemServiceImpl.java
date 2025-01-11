package com.client.service.impl;

import com.client.dto.request.item.SearchItemRequest;
import com.client.dto.response.item.ItemResponse;
import com.client.entities.Item;
import com.client.helper.ResponseHelper;
import com.client.model.OrderBy;
import com.client.model.QueryRequest;
import com.client.service.ItemService;
import com.client.utils.ValidationUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ItemServiceImpl implements ItemService {
    private final EntityManager entityManager;

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
}
