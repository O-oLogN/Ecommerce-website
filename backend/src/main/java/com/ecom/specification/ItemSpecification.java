package com.ecom.specification;

import com.ecom.entities.Item;
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
public class ItemSpecification {
    public Specification<Item> specification(String itemName) {
        return (root, _, cb) ->
            cb.createTupleQuery()
            .where(getWhereCondition(cb, root, itemName))
            .getRestriction();
    }

    private Predicate getWhereCondition(CriteriaBuilder cb, Root<Item> itemRoot, String itemName) {
        Predicate predicate = cb.conjunction();

        predicate = cb.and(predicate, !ValidationUtils.isNullOrEmpty(itemName)
                ? cb.like(itemRoot.get("name"), "%" + itemName + "%")
                : cb.conjunction());

        return predicate;
    }
}
