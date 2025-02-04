package com.ecom.specification;

import com.ecom.entities.User;
import com.ecom.utils.ValidationUtils;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserSpecification {
    public Specification<User> specification(String username) {
        return (root, _, cb) -> {
            Predicate predicate = getWhereCondition(cb, root, username);
            return cb.createTupleQuery()
                    .where(predicate).getRestriction();
        };
    }

    private Predicate getWhereCondition(CriteriaBuilder cb, Root<User> userRoot, String username) {
        Predicate predicate = cb.conjunction();

        predicate = cb.and(predicate, !ValidationUtils.isNullOrEmpty(username)
                ? cb.like(userRoot.get("username"), "%" + username + "%")
                : cb.conjunction());

        return predicate;
    }
}
