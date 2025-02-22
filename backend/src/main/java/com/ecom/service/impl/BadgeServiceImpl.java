package com.ecom.service.impl;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.ecom.constant.CoreConstants;
import com.ecom.dto.request.badge.CreateBadgeRequest;
import com.ecom.dto.request.badge.UpdateBadgeRequest;
import com.ecom.dto.response.minio.EditFileResponse;
import com.ecom.dto.response.minio.UploadFileResponse;
import com.ecom.entities.Badge;
import com.ecom.helper.MessageHelper;
import com.ecom.helper.ResponseHelper;
import com.ecom.model.OrderBy;
import com.ecom.model.PageInfo;
import com.ecom.model.PagingResponse;
import com.ecom.model.QueryRequest;
import com.ecom.repository.BadgeRepository;
import com.ecom.service.BadgeService;
import com.ecom.service.MinioService;
import com.ecom.specification.BadgeSpecification;
import com.ecom.utils.SortUtils;
import com.ecom.utils.ValidationUtils;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.transaction.Transactional;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class BadgeServiceImpl implements BadgeService {
    private final MinioService minioService;

    private final BadgeRepository badgeRepository;

    private final MessageHelper messageHelper;

    private final BadgeSpecification badgeSpecification;

    private final Dotenv dotenv = Dotenv.load();

    @Override
    public ResponseEntity<?> createBadge(CreateBadgeRequest createBadgeRequest) throws Exception {
        MultipartFile icon = createBadgeRequest.getIcon();
        String description = createBadgeRequest.getDescription();

        if (ValidationUtils.isNullOrEmpty(description)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.badgeController.create.error.validation.description")
            );
        }

        String iconMinioGetUrl = null;
        String iconMinioPutUrl = null;
        if (!ValidationUtils.isNullOrEmpty(icon)) {
            UploadFileResponse response = minioService.uploadFile(icon, dotenv.get("MINIO_ICON_UPLOAD_DIR"));
            iconMinioGetUrl = response.getPresignedGetUrl();
            iconMinioPutUrl = response.getPresignedPutUrl();
        }

        Badge newBadge = Badge.builder()
                            .badgeId(UUID.randomUUID().toString())
                            .iconMinioGetUrl(iconMinioGetUrl == null ? "" : iconMinioGetUrl)
                            .iconMinioPutUrl(iconMinioPutUrl == null ? "" : iconMinioPutUrl)
                            .description(description)
                            .createUser(CoreConstants.ROLE.ADMIN)
                            .createDatetime(LocalDateTime.now())
                            .build();

        badgeRepository.save(newBadge);

        return ResponseHelper.ok(newBadge, HttpStatus.OK, messageHelper.getMessage("admin.badgeController.create.info.success"));
    }

    @Override
    public ResponseEntity<?> updateBadge(UpdateBadgeRequest updateBadgeRequest) throws Exception {
        String badgeId = updateBadgeRequest.getBadgeId();
        MultipartFile icon = updateBadgeRequest.getIcon();
        String iconMinioGetUrl = updateBadgeRequest.getIconMinioGetUrl();
        String iconMinioPutUrl = updateBadgeRequest.getIconMinioPutUrl();
        String description = updateBadgeRequest.getDescription();    

        if (ValidationUtils.isNullOrEmpty(description)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.badgeController.update.error.validation.description")
            );
        }

        if (!ValidationUtils.isNullOrEmpty(icon)) {
            if (ValidationUtils.isNullOrEmpty(iconMinioPutUrl)) {
                UploadFileResponse uploadResponse = minioService.uploadFile(icon, dotenv.get("MINIO_ICON_UPLOAD_DIR"));
                iconMinioGetUrl = uploadResponse.getPresignedGetUrl();
                iconMinioPutUrl = uploadResponse.getPresignedPutUrl();
            }
            else {
                EditFileResponse editResponse = minioService.editFile(icon, dotenv.get("MINIO_ICON_UPLOAD_DIR"), iconMinioPutUrl);
                iconMinioGetUrl = editResponse.getPresignedGetUrl();
                iconMinioPutUrl = editResponse.getPresignedPutUrl();
            }
        }

        Badge badge = badgeRepository.findById(badgeId).orElse(null);
        assert badge != null;
        badge.setIconMinioGetUrl(iconMinioGetUrl == null ? "" : iconMinioGetUrl);
        badge.setIconMinioPutUrl(iconMinioPutUrl == null? "" : iconMinioPutUrl);
        badge.setDescription(description);
        badge.setModifyUser(CoreConstants.ROLE.ADMIN);
        badge.setModifyDatetime(LocalDateTime.now());

        badgeRepository.save(badge);

        return ResponseHelper.ok(badge, HttpStatus.OK, messageHelper.getMessage("admin.badgeController.update.info.success"));
    }

    @Override
    public ResponseEntity<?> searchBadge(QueryRequest<String> searchBadgeRequest) {
        String description = searchBadgeRequest.getSample();
        PageInfo pageInfo = searchBadgeRequest.getPageInfo();
        List<OrderBy> orders = searchBadgeRequest.getOrders();

        Specification<Badge> specification = badgeSpecification.getSpecification(description);

        Page<Badge> page = badgeRepository.findAll(
            specification,
            PageRequest.of(
                pageInfo.getPageNumber(),
                pageInfo.getPageSize(),
                SortUtils.buildSort(orders)
            )
        );

        List<Badge> badges = page.getContent();

        return ResponseHelper.ok(
            PagingResponse.<Badge>builder()
                .totalPages(page.getTotalPages())
                .totalElements(page.getTotalElements())
                .pageNumber(pageInfo.getPageNumber())
                .pageSize(pageInfo.getPageSize())
                .numberOfElements(page.getNumberOfElements())
                .content(badges)
                .build(), HttpStatus.OK, "");
    }

    @Override
    public ResponseEntity<?> deleteBadge(String badgeId) throws Exception {
        Badge badge = badgeRepository.findById(badgeId).orElse(null);

        assert badge != null;
        String iconMinioPutUrl = badge.getIconMinioPutUrl();
        if (!ValidationUtils.isNullOrEmpty(iconMinioPutUrl)) {
            minioService.deleteFile(iconMinioPutUrl);
        }

        badgeRepository.delete(badge);

        return ResponseHelper.ok(badge, HttpStatus.OK, messageHelper.getMessage("admin.badgeController.delete.info.success"));
    }
    
}
