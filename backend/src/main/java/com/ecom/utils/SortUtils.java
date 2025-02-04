package com.ecom.utils;

import com.ecom.model.OrderBy;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class SortUtils {
    public static Sort buildSort(List<OrderBy> orders) {
        return Sort.by(ValidationUtils.isNullOrEmpty(orders)
            ? new ArrayList<>()
            : orders.stream().map(order -> new Sort.Order(Sort.Direction.fromString(order.getDirection()), order.getProperty())).collect(Collectors.toList()));
    }
}
