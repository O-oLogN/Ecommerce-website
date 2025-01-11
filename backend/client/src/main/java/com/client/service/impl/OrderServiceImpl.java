package com.client.service.impl;

import com.client.constant.CoreConstants;
import com.client.dto.request.order.CreateChildOrderRequest;
import com.client.dto.request.order.CreateTotalOrderRequest;
import com.client.dto.response.order.TotalOrderResponse;
import com.client.entities.Item;
import com.client.entities.Order;
import com.client.entities.TotalOrder;
import com.client.exception.OrderNotFoundException;
import com.client.helper.MessageHelper;
import com.client.helper.ResponseHelper;
import com.client.repository.OrderRepository;
import com.client.repository.TotalOrderRepository;
import com.client.repository.UserRepository;
import com.client.service.OrderService;
import com.client.utils.ValidationUtils;
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
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final TotalOrderRepository totalOrderRepository;
    private final UserRepository userRepository;

    private final MessageHelper messageHelper;

    private final EntityManager entityManager;

    @Override
    public ResponseEntity<?> deleteChildOrder(String orderId) {
        Order childOrder = orderRepository.findOrderByOrderId(orderId);
        TotalOrder totalOrder = totalOrderRepository.findTotalOrderByTotalOrderId(childOrder.getParentId());

        // Get item price
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();

        CriteriaQuery<Item> query = cb.createQuery(Item.class);
        Root<Item> itemRoot = query.from(Item.class);

        Subquery<Order> subquery = query.subquery(Order.class);
        Root<Order> orderRoot = query.from(Order.class);
        Predicate orderIdPredicate = cb.equal(orderRoot.get("orderId"), orderId);

        subquery.select(orderRoot.get("itemId"))
                .where(orderIdPredicate);

        query.select(itemRoot.get("itemId"))
                .where(
                        cb.in(subquery)
                );

        float itemPrice = entityManager.createQuery(query).getSingleResult().getPrice();
        float orderPrice = itemPrice * childOrder.getQuantity();

        totalOrder.setPrice(totalOrder.getPrice() - orderPrice);
        totalOrder.setModifyUser(CoreConstants.USER.CLIENT);
        totalOrder.setModifyDatetime(LocalDateTime.now());

        orderRepository.delete(childOrder);
        totalOrderRepository.save(totalOrder);
        List<Order> childOrders = orderRepository.findOrdersByParentId(childOrder.getParentId());

        if (childOrders.isEmpty()) {
            totalOrderRepository.delete(totalOrder);
        }

        return ResponseHelper.ok(TotalOrderResponse
                .builder()
                .totalOrder(totalOrder)
                .childOrders(childOrders)
                .build(),
                HttpStatus.OK, messageHelper.getMessage("client.orderController.delete.child.info.success"));
    }

    @Override
    public ResponseEntity<?> deleteTotalOrder(String totalOrderId) throws Exception {
        TotalOrder totalOrder = totalOrderRepository.findById(totalOrderId)
                .orElseThrow(() -> new OrderNotFoundException(
                    messageHelper.getMessage("client.orderController.delete.total.find.error")
                ));
        List<Order> childOrders = orderRepository.findOrdersByParentId(totalOrderId);

        totalOrderRepository.delete(totalOrder);
        orderRepository.deleteAll(childOrders);
        return ResponseHelper.ok(null, HttpStatus.OK, messageHelper.getMessage("client.orderController.delete.total.info.success"));
    }

    @Override
    public ResponseEntity<?> createTotalOrder(CreateTotalOrderRequest createTotalOrderRequest) throws Exception {
        String totalOrderId = UUID.randomUUID().toString();
        String userId = userRepository.findUserByUsername(createTotalOrderRequest.getUsername()).getUserId();
        Float price = createTotalOrderRequest.getPrice();
        String createUser = CoreConstants.USER.CLIENT;
        LocalDateTime createDatetime = LocalDateTime.now();

        if (ValidationUtils.isNullOrEmpty(userId)) {
            throw new ValidationException(
                messageHelper.getMessage("client.orderController.create.error.validation.userId")
            );
        }
        if (ValidationUtils.isNullOrEmpty(price.toString())) {
            throw new ValidationException(
                messageHelper.getMessage("client.orderController.create.error.validation.price")
            );
        }

        TotalOrder totalOrder = TotalOrder
                .builder()
                .totalOrderId(totalOrderId)
                .userId(userId)
                .price(price)
                .createUser(createUser)
                .createDatetime(createDatetime)
                .build();

        totalOrderRepository.save(totalOrder);

        List<Order> childOrders = new ArrayList<>();
        for (CreateChildOrderRequest request : createTotalOrderRequest.getCreateChildOrderRequests()) {
            Order childOrder = Order
                    .builder()
                    .orderId(UUID.randomUUID().toString())
                    .userId(request.getUserId())
                    .itemId(request.getItemId())
                    .parentId(totalOrderId)
                    .quantity(request.getQuantity())
                    .createUser(createUser)
                    .createDatetime(createDatetime)
                    .build();
            childOrders.add(childOrder);
        }

        orderRepository.saveAll(childOrders);
        return ResponseHelper.ok(TotalOrderResponse.builder().totalOrder(totalOrder).childOrders(childOrders).build(),
                HttpStatus.OK, messageHelper.getMessage("client.orderController.create.info.success"));
    }
}
