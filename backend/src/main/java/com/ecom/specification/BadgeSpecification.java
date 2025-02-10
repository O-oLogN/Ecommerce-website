package com.ecom.specification;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import com.ecom.entities.Badge;
import com.ecom.utils.ValidationUtils;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class BadgeSpecification {
    public Specification<Badge> getSpecification(String description) {
        return (root, _, cb) -> cb.createTupleQuery()
                .where(getWhereCondition(cb, root, description))
                .getRestriction();
    } 
    
    private Predicate getWhereCondition(CriteriaBuilder cb, Root<Badge> badgeRoot, String description) {
        Predicate predicate = cb.conjunction();

        predicate = cb.and(predicate, !ValidationUtils.isNullOrEmpty(description)
                ? cb.like(badgeRoot.get("description"), "%" + description + "%")
                : cb.conjunction());
        
        return predicate;    
    }
}
