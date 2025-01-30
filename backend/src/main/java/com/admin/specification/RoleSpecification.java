package com.admin.specification;

import com.admin.entities.Role;
import com.admin.utils.ValidationUtils;
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
public class RoleSpecification {
    public Specification<Role> specification(String roleName) {
        return (root, _, cb) ->
                cb.createTupleQuery()
                        .where(getWhereCondition(cb, root, roleName))
                        .getRestriction();
    }

    private Predicate getWhereCondition(CriteriaBuilder cb, Root<Role> roleRoot, String roleName) {
        Predicate predicate = cb.conjunction();

        predicate = cb.and(predicate, !ValidationUtils.isNullOrEmpty(roleName)
                ? cb.like(roleRoot.get("name"), "%" + roleName + "%")
                : cb.conjunction());

        return predicate;
    }
}
