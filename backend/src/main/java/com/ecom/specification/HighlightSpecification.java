package com.ecom.specification;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.ecom.entities.Highlight;
import com.ecom.utils.ValidationUtils;

import jakarta.persistence.criteria.Predicate;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class HighlightSpecification {
    public Specification<Highlight> getSpecification(String content) {
        return (root, _, cb) -> cb.createTupleQuery()
                .where(getWhereCondition(cb, root, content))
                .getRestriction();
    }

    private Predicate getWhereCondition(CriteriaBuilder cb, Root<Highlight> root, String content) {
        Predicate predicate = cb.conjunction();
        
        predicate = cb.and(predicate, !ValidationUtils.isNullOrEmpty(content)
                ? cb.like(root.get("content"), "%" + content + "%")
                : cb.conjunction()); 
    
        return predicate;
    }
}
