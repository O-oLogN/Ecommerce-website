package com.ecom.service.impl;

import com.ecom.constant.CoreConstants;
import com.ecom.dto.request.order.DeleteChildOrderRequest;
import com.ecom.dto.request.order.UpdateOrderPaymentStatusRequest;
import com.ecom.entities.Order;
import com.ecom.entities.TotalOrder;
import com.ecom.exception.OrderNotFoundException;
import com.ecom.helper.MessageHelper;
import com.ecom.helper.ResponseHelper;
import com.ecom.model.OrderBy;
import com.ecom.model.PageInfo;
import com.ecom.model.PagingResponse;
import com.ecom.model.QueryRequest;
import com.ecom.repository.ItemRepository;
import com.ecom.repository.OrderRepository;
import com.ecom.repository.TotalOrderRepository;
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
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final TotalOrderRepository totalOrderRepository;
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
    public ResponseEntity<?> deleteChildOrder(DeleteChildOrderRequest deleteChildOrderRequest) throws Exception {
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
            totalOrder.setModifyUser(CoreConstants.ROLE.ADMIN);
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

        TotalOrder totalOrder = totalOrderRepository.findTotalOrderByTotalOrderId(totalOrderId);

        totalOrder.setPaymentStatus(paymentStatus);
        totalOrder.setModifyUser(CoreConstants.ROLE.ADMIN);
        totalOrder.setModifyDatetime(LocalDateTime.now());

        totalOrderRepository.save(totalOrder);
        return ResponseHelper.ok(totalOrder, HttpStatus.OK, messageHelper.getMessage("admin.orderController.update.paymentStatus.info.success"));
    }
}
