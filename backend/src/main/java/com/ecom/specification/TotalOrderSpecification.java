package com.ecom.specification;

import com.ecom.entities.TotalOrder;
import com.ecom.utils.ValidationUtils;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class TotalOrderSpecification {
    public Specification<TotalOrder> getSpecification(String orderNumber) {
        return (root, _, cb) ->
                cb.createTupleQuery()
                        .where(getWhereCondition(cb, root, orderNumber))
                        .getRestriction();
    }

    private Predicate getWhereCondition(CriteriaBuilder cb, Root<TotalOrder> totalOrderRoot, String orderNumber) {
        Predicate predicate = cb.conjunction();

        predicate = cb.and(predicate, !ValidationUtils.isNullOrEmpty(orderNumber)
                ? cb.like(totalOrderRoot.get("name"), "%" + totalOrderRoot + "%")
                : cb.conjunction());

        return predicate;
    }
}
