package com.ecom.specification;

import com.ecom.entities.ItemCategory;
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
public class CategorySpecification {
    public Specification<ItemCategory> specification(String categoryName) {
        return (root, _, cb) ->
                cb.createTupleQuery()
                        .where(getWhereCondition(cb, root, categoryName))
                        .getRestriction();
    }

    private Predicate getWhereCondition(CriteriaBuilder cb, Root<ItemCategory> itemRoot, String categoryName) {
        Predicate predicate = cb.conjunction();

        predicate = cb.and(predicate, !ValidationUtils.isNullOrEmpty(categoryName)
                ? cb.like(itemRoot.get("name"), "%" + categoryName + "%")
                : cb.conjunction());

        return predicate;
    }
}
