package com.ecom.service.impl;

import com.ecom.constant.CoreConstants;
import com.ecom.dto.request.order.SearchTotalOrderRequest;
import com.ecom.dto.request.order.UpdateOrderPaymentStatusRequest;
import com.ecom.dto.response.order.SubTotalOrderResponse;
import com.ecom.dto.response.order.TotalOrderResponse;
import com.ecom.entities.Item;
import com.ecom.entities.Order;
import com.ecom.entities.TotalOrder;
import com.ecom.exception.OrderNotFoundException;
import com.ecom.helper.MessageHelper;
import com.ecom.helper.ResponseHelper;
import com.ecom.model.OrderBy;
import com.ecom.model.QueryRequest;
import com.ecom.repository.OrderRepository;
import com.ecom.repository.TotalOrderRepository;
import com.ecom.service.OrderService;
import com.ecom.utils.ValidationUtils;
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

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final TotalOrderRepository totalOrderRepository;

    private final MessageHelper messageHelper;

    private final EntityManager entityManager;

    @Override
    public ResponseEntity<?> searchTotalOrder(QueryRequest<SearchTotalOrderRequest> searchTotalOrderRequest) {
        String totalOrderId = searchTotalOrderRequest.getSample().getTotalOrderId();

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<TotalOrder> cq = cb.createQuery(TotalOrder.class);

        Root<TotalOrder> tor = cq.from(TotalOrder.class);

        Predicate predicate;
        if (ValidationUtils.isNullOrEmpty(totalOrderId)) {
            predicate = cb.conjunction();
        } else {
            predicate = cb.like(tor.get("totalOrderId"), "%" + totalOrderId + "%");
        }

        cq.where(predicate);

        if (!ValidationUtils.isNullOrEmpty(searchTotalOrderRequest.getOrders())) {
            List<jakarta.persistence.criteria.Order> orderList = new ArrayList<>();
            for (OrderBy orderBy : searchTotalOrderRequest.getOrders()) {
                if ("ASC".equalsIgnoreCase(orderBy.getDirection())) {
                    orderList.add(cb.asc(tor.get(orderBy.getProperty())));
                } else if ("DESC".equalsIgnoreCase(orderBy.getDirection())) {
                    orderList.add(cb.desc(tor.get(orderBy.getProperty())));
                }
            }
            cq.orderBy(orderList);
        }

        List<SubTotalOrderResponse> subTotalOrderResponses = new ArrayList<>();
        List<TotalOrder> totalOrders = entityManager.createQuery(cq).getResultList();
        for (TotalOrder totalOrder : totalOrders) {
            List<Order> childOrders = orderRepository.findOrdersByParentId(totalOrder.getTotalOrderId());
            SubTotalOrderResponse subTotalOrderresponse = SubTotalOrderResponse
                    .builder()
                    .totalOrder(totalOrder)
                    .childOrderSize(childOrders.size())
                    .childOrders(childOrders)
                    .build();
            subTotalOrderResponses.add(subTotalOrderresponse);
        }

        return ResponseHelper.ok(TotalOrderResponse
                .builder()
                .totalOrderSize(subTotalOrderResponses.size())
                .subTotalOrderResponses(subTotalOrderResponses)
                .build(),
                HttpStatus.OK, "");
    }

    @Override
    public ResponseEntity<?> deleteChildOrder(String orderId) throws Exception {
        Order childOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(
                    messageHelper.getMessage("admin.orderController.delete.child.find.error.notFound")
                ));
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
        totalOrder.setModifyUser(CoreConstants.ROLE.ADMIN);
        totalOrder.setModifyDatetime(LocalDateTime.now());

        orderRepository.delete(childOrder);
        totalOrderRepository.save(totalOrder);
        List<Order> childOrders = orderRepository.findOrdersByParentId(childOrder.getParentId());

        if (childOrders.isEmpty()) {
            totalOrderRepository.delete(totalOrder);
        }

        SubTotalOrderResponse subTotalOrderResponse = SubTotalOrderResponse
                .builder()
                .totalOrder(totalOrder)
                .childOrderSize(childOrders.size())
                .childOrders(childOrders)
                .build();

        List<SubTotalOrderResponse> subTotalOrderResponses = new ArrayList<>();
        subTotalOrderResponses.add(subTotalOrderResponse);

        return ResponseHelper.ok(TotalOrderResponse
                .builder()
                .totalOrderSize(1)
                .subTotalOrderResponses(subTotalOrderResponses)
                .build(),
                HttpStatus.OK, messageHelper.getMessage("admin.orderController.delete.child.info.success"));
    }

    @Override
    public ResponseEntity<?> deleteTotalOrder(String totalOrderId) throws Exception {
        TotalOrder totalOrder = totalOrderRepository.findById(totalOrderId)
                .orElseThrow(() -> new OrderNotFoundException(
                    messageHelper.getMessage("admin.orderController.delete.total.find.error.notFound")
                ));
        List<Order> childOrders = orderRepository.findOrdersByParentId(totalOrderId);

        totalOrderRepository.delete(totalOrder);
        orderRepository.deleteAll(childOrders);
        return ResponseHelper.ok(null, HttpStatus.OK, messageHelper.getMessage("admin.orderController.delete.total.info.success"));
    }

    @Override
    public ResponseEntity<?> updateOrderPaymentStatus(UpdateOrderPaymentStatusRequest updateOrderPaymentStatusRequest) throws Exception {
        String totalOrderId = updateOrderPaymentStatusRequest.getTotalOrderId();
        Integer paymentStatus = updateOrderPaymentStatusRequest.getPaymentStatus();

        if (ValidationUtils.isNullOrEmpty(totalOrderId)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.orderController.update.paymentStatus.error.validation.totalOrderId")
            );
        }
        if (ValidationUtils.isNullOrEmpty(paymentStatus)) {
            throw new ValidationException(
                    messageHelper.getMessage("admin.orderController.update.paymentStatus.error.validation.paymentStatus")
            );
        }

        TotalOrder totalOrder = totalOrderRepository.findById(totalOrderId)
                .orElseThrow(() -> new OrderNotFoundException(
                    messageHelper.getMessage("admin.orderController.update.paymentStatus.error.find.notFound")
                ));

        totalOrder.setPaymentStatus(paymentStatus);
        totalOrder.setModifyUser(CoreConstants.ROLE.ADMIN);
        totalOrder.setModifyDatetime(LocalDateTime.now());

        totalOrderRepository.save(totalOrder);
        return ResponseHelper.ok(totalOrder, HttpStatus.OK, messageHelper.getMessage("admin.orderController.update.paymentStatus.info.success"));
    }
}
