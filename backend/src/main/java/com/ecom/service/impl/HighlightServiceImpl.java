package com.ecom.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ecom.constant.CoreConstants;
import com.ecom.dto.request.highlight.UpdateHighlightRequest;
import com.ecom.entities.Highlight;
import com.ecom.exception.HighlightNotFoundException;
import com.ecom.helper.MessageHelper;
import com.ecom.helper.ResponseHelper;
import com.ecom.model.OrderBy;
import com.ecom.model.PageInfo;
import com.ecom.model.PagingResponse;
import com.ecom.model.QueryRequest;
import org.springframework.data.domain.Page;
import com.ecom.repository.HighlightRepository;
import com.ecom.service.HighlightService;
import com.ecom.specification.HighlightSpecification;
import com.ecom.utils.SortUtils;
import com.ecom.utils.ValidationUtils;

import jakarta.transaction.Transactional;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class HighlightServiceImpl implements HighlightService {
    private final HighlightRepository highlightRepository;

    private final HighlightSpecification highlightSpecification;

    private final MessageHelper messageHelper;
    
    @Override
    public ResponseEntity<?> createHighlight(String content) throws Exception {
        if (ValidationUtils.isNullOrEmpty(content)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.highlightController.create.error.validation.content")
            );
        }
        
        Highlight newHighlight = Highlight.builder()
                            .content(content)
                            .highlightId(UUID.randomUUID().toString())
                            .createUser(CoreConstants.ROLE.ADMIN)
                            .createDatetime(LocalDateTime.now())
                            .build();

        highlightRepository.save(newHighlight);
        return ResponseHelper.ok(newHighlight, HttpStatus.OK, messageHelper.getMessage("admin.highlightController.create.info.success"));
    }

    @Override
    public ResponseEntity<?> deleteHighlight(String highlightId) throws Exception {
        if (ValidationUtils.isNullOrEmpty(highlightId)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.highlightController.delete.error.validation.highlightId")
            );
        } 

        Highlight highlight = highlightRepository.findById(highlightId).orElse(null);
        if (highlight == null) {
            throw new HighlightNotFoundException(
                messageHelper.getMessage("admin.highlightController.delete.highlight.find.error.notFound")
            );
        }
        highlightRepository.delete(highlight);
        return ResponseHelper.ok(highlight, HttpStatus.OK, messageHelper.getMessage("admin.highlightController.delete.info.success"));
    }

    @Override
    public ResponseEntity<?> searchHighlight(QueryRequest<String> searchHighlightRequest) {
        String content = searchHighlightRequest.getSample();
        PageInfo pageInfo = searchHighlightRequest.getPageInfo();
        List<OrderBy> orders = searchHighlightRequest.getOrders();

        PageRequest pageRequest = PageRequest.of(
            pageInfo.getPageNumber(),
            pageInfo.getPageSize(),
            SortUtils.buildSort(orders)
        );

        Page<Highlight> page = highlightRepository.findAll(
            highlightSpecification.getSpecification(content),
            pageRequest
        );
        
        List<Highlight> highlights = page.getContent();
        return ResponseHelper.ok(
            PagingResponse.<Highlight>builder()
                    .totalPages(page.getTotalPages())
                    .totalElements(page.getTotalElements())
                    .pageNumber(pageInfo.getPageNumber())
                    .pageSize(pageInfo.getPageSize())
                    .numberOfElements(page.getNumberOfElements())
                    .content(highlights)
                .build(),
            HttpStatus.OK, ""
        );
    }

    @Override
    public ResponseEntity<?> updateHighlight(UpdateHighlightRequest updateHighlightRequest) throws Exception {
        String content = updateHighlightRequest.getContent();

        if (ValidationUtils.isNullOrEmpty(content)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.highlightController.update.validation.content")
            );
        }

        Highlight highlight = highlightRepository.findById(updateHighlightRequest.getHighlightId())
                                             .orElse(null);

        highlight.setContent(content);
        highlight.setModifyUser(CoreConstants.ROLE.ADMIN);
        highlight.setModifyDatetime(LocalDateTime.now());

        highlightRepository.save(highlight);
        return ResponseHelper.ok(highlight, HttpStatus.OK, messageHelper.getMessage("admin.highlightController.update.info.success"));
    }
    
}
