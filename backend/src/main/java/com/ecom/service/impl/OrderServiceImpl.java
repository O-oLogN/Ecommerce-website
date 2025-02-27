package com.ecom.service.impl;

import com.ecom.constant.CoreConstants;
import com.ecom.dto.request.order.*;
import com.ecom.dto.response.order.CreateTotalOrderResponse;
import com.ecom.entities.Order;
import com.ecom.entities.TotalOrder;
import com.ecom.helper.MessageHelper;
import com.ecom.helper.ResponseHelper;
import com.ecom.model.OrderBy;
import com.ecom.model.PageInfo;
import com.ecom.model.PagingResponse;
import com.ecom.model.QueryRequest;
import com.ecom.repository.ItemRepository;
import com.ecom.repository.OrderRepository;
import com.ecom.repository.TotalOrderRepository;
import com.ecom.repository.UserRepository;
import com.ecom.service.OrderService;
import com.ecom.specification.TotalOrderSpecification;
import com.ecom.utils.SortUtils;
import com.ecom.utils.ValidationUtils;
import jakarta.xml.bind.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.atomic.AtomicReference;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final TotalOrderRepository totalOrderRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    private final MessageHelper messageHelper;

    private final TotalOrderSpecification totalOrderSpecification;

    @Override
    public ResponseEntity<?> searchTotalOrder(QueryRequest<String> searchTotalOrderRequest) {
        String totalOrderNumber = searchTotalOrderRequest.getSample();
        PageInfo pageInfo = searchTotalOrderRequest.getPageInfo();
        List<OrderBy> orderList = searchTotalOrderRequest.getOrders();

        Specification<TotalOrder> specification = totalOrderSpecification.getSpecification(totalOrderNumber);

        Page<TotalOrder> page = totalOrderRepository.findAll(
                specification,
                PageRequest.of(
                        pageInfo.getPageNumber(),
                        pageInfo.getPageSize(),
                        SortUtils.buildSort(orderList)
                )
        );
        List<TotalOrder> totalOrders = page.getContent();

        return ResponseHelper.ok(
                PagingResponse.<TotalOrder>builder()
                        .totalPages(page.getTotalPages())
                        .totalElements(page.getTotalElements())
                        .pageNumber(pageInfo.getPageNumber())
                        .pageSize(pageInfo.getPageSize())
                        .numberOfElements(page.getNumberOfElements())
                        .content(totalOrders)
                        .build(),
                HttpStatus.OK, ""
        );
    }

    @Override
    public ResponseEntity<?> searchChildOrders(String totalOrderId) throws Exception {
        if (ValidationUtils.isNullOrEmpty(totalOrderId)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.orderController.search.childOrders.error.validation.totalOrderId")
            );
        }
        List<Order> childOrders = orderRepository.findOrdersByParentId(totalOrderId);

        return ResponseHelper.ok(
            childOrders, HttpStatus.OK, ""
        );
    }

    @Override
    public ResponseEntity<?> createTotalOrder(CreateTotalOrderRequest createTotalOrderRequest, String role) {
        String userId = createTotalOrderRequest.getUserId();
        String orderCode = createTotalOrderRequest.getOrderCode();
        List<CreateChildOrderRequest> createChildOrderRequests = createTotalOrderRequest.getCreateChildOrderRequests();

        TotalOrder newTotalOrder = TotalOrder.builder()
                .totalOrderId(UUID.randomUUID().toString())
                .userId(userId)
                .status(CoreConstants.TOTAL_ORDER_STATUS.ACTIVE)
                .paymentStatus(CoreConstants.PAYMENT_STATUS.UNPAID)
                .orderCode(orderCode)
                .createUser(role)
                .createDatetime(LocalDateTime.now())
                .build();

        Set<Order> childOrders = new HashSet<>();
        AtomicReference<Float> totalPrice = new AtomicReference<>(0f);
        createChildOrderRequests.forEach(request -> {
            Order order = Order.builder()
                    .orderId(UUID.randomUUID().toString())
                    .userId(userId)
                    .itemId(request.getItemId())
                    .parentId(newTotalOrder.getTotalOrderId())
                    .quantity(request.getQuantity())
                    .createUser(role)
                    .createDatetime(LocalDateTime.now())
                    .build();

            childOrders.add(order);
            totalPrice.updateAndGet(v -> v + itemRepository.findItemByItemId(order.getItemId()).getPrice() * request.getQuantity());
        });

        newTotalOrder.setOrders(childOrders);
        newTotalOrder.setPrice(totalPrice.get());
        totalOrderRepository.save(newTotalOrder);

        return ResponseHelper.ok(
            CreateTotalOrderResponse.builder()
                    .totalOrder(newTotalOrder)
                    .numberOfChildOrders(childOrders.size())
                    .childOrders(childOrders)
                    .build(),
            HttpStatus.OK, messageHelper.getMessage("admin.orderController.create.totalOrder.info.success")
        );
    }

    @Override
    public ResponseEntity<?> deleteChildOrder(DeleteChildOrderRequest deleteChildOrderRequest, String role) throws Exception {
        String totalOrderId = deleteChildOrderRequest.getTotalOrderId();
        String childOrderId = deleteChildOrderRequest.getChildOrderId();

        if (ValidationUtils.isNullOrEmpty(totalOrderId)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.orderController.delete.child.error.validation.totalOrderId")
            );
        }
        if (ValidationUtils.isNullOrEmpty(childOrderId)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.orderController.delete.child.error.validation.childOrderId")
            );
        }

        TotalOrder totalOrder = totalOrderRepository.findTotalOrderByTotalOrderId(totalOrderId);
        Set<Order> childOrders = totalOrder.getOrders();
        Order childOrder = orderRepository.findById(childOrderId).orElse(null);
        assert childOrder != null;
        childOrders.remove(childOrder);
        if (!childOrders.isEmpty()) {
            totalOrder.setOrders(childOrders);
            totalOrder.setPrice(totalOrder.getPrice() - itemRepository.findItemByItemId(childOrder.getItemId()).getPrice());
            totalOrder.setModifyUser(role);
            totalOrder.setModifyDatetime(LocalDateTime.now());
            totalOrderRepository.save(totalOrder);
        }
        else {
            totalOrderRepository.deleteTotalOrderByTotalOrderId(totalOrderId);
        }

        return ResponseHelper.ok(
            childOrders, HttpStatus.OK, messageHelper.getMessage("admin.orderController.delete.child.info.success")
        );
    }

    @Override
    public ResponseEntity<?> findUserIdByUsername(String username) throws Exception {
        if (ValidationUtils.isNullOrEmpty(username)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.orderController.create.totalOrder.error.validation.username")
            );
        }
        return ResponseHelper.ok(
            userRepository.findUserByUsername(username).getUserId(), HttpStatus.OK, ""
        );
    }

    @Override
    public ResponseEntity<?> getLatestOrderCode() {
        List<TotalOrder> totalOrders = totalOrderRepository.findAll(
            SortUtils.buildSort(
                Collections.singletonList(OrderBy.builder().property("createDatetime").direction("desc").build()))
        );
        return ResponseHelper.ok(totalOrders.getFirst().getOrderCode(), HttpStatus.OK, "");
    }

    @Override
    public ResponseEntity<?> deleteTotalOrder(String totalOrderId) throws ValidationException {
        if (ValidationUtils.isNullOrEmpty(totalOrderId)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.orderController.delete.totalOrder.error.validation.totalOrderId")
            );
        }

        totalOrderRepository.deleteTotalOrderByTotalOrderId(totalOrderId);
        return ResponseHelper.ok(null, HttpStatus.OK, messageHelper.getMessage("admin.orderController.delete.total.info.success"));
    }

    @Override
    public ResponseEntity<?> updateOrderPaymentStatus(UpdateTotalOrderPaymentStatusRequest updateTotalOrderPaymentStatusRequest, String role) throws Exception {
        String totalOrderId = updateTotalOrderPaymentStatusRequest.getTotalOrderId();
        Integer paymentStatus = updateTotalOrderPaymentStatusRequest.getPaymentStatus();

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

        TotalOrder totalOrder = totalOrderRepository.findTotalOrderByTotalOrderId(totalOrderId);

        totalOrder.setPaymentStatus(paymentStatus == 1 ? CoreConstants.PAYMENT_STATUS.PAID : CoreConstants.PAYMENT_STATUS.UNPAID);
        totalOrder.setModifyUser(role);
        totalOrder.setModifyDatetime(LocalDateTime.now());

        totalOrderRepository.save(totalOrder);
        return paymentStatus.equals(CoreConstants.PAYMENT_STATUS.PAID) ?
            ResponseHelper.ok(totalOrder, HttpStatus.OK, messageHelper.getMessage("admin.orderController.update.paymentStatus.paid.info.success"))
        : ResponseHelper.ok(totalOrder, HttpStatus.OK, messageHelper.getMessage("admin.orderController.update.paymentStatus.unpaid.info.success"));
    }

    @Override
    public ResponseEntity<?> updateTotalOrderStatus(UpdateTotalOrderStatusRequest updateTotalOrderStatusRequest) throws Exception {
        String totalOrderId = updateTotalOrderStatusRequest.getTotalOrderId();
        Integer totalOrderStatus = updateTotalOrderStatusRequest.getStatus();

        if (ValidationUtils.isNullOrEmpty(updateTotalOrderStatusRequest)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.orderController.update.totalOrder.status.error.validation.totalOrderId")
            );
        }

        TotalOrder totalOrder = totalOrderRepository.findTotalOrderByTotalOrderId(totalOrderId);
        totalOrder.setStatus(totalOrderStatus == 1 ? CoreConstants.TOTAL_ORDER_STATUS.ACTIVE : CoreConstants.TOTAL_ORDER_STATUS.INACTIVE);
        totalOrder.setModifyUser(CoreConstants.ROLE.ADMIN);
        totalOrder.setModifyDatetime(LocalDateTime.now());
        totalOrderRepository.save(totalOrder);

        return totalOrderStatus.equals(CoreConstants.TOTAL_ORDER_STATUS.ACTIVE) ?
            ResponseHelper.ok(
                totalOrder, HttpStatus.OK,  messageHelper.getMessage("admin.orderController.update.totalOrder.status.activate.info.success")
            )
            : ResponseHelper.ok(
                totalOrder, HttpStatus.OK,  messageHelper.getMessage("admin.orderController.update.totalOrder.status.deactivate.info.success")
            );
    }
}
