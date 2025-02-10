package com.ecom.entities;

import com.ecom.constant.CoreConstants;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "badge")
public class Badge {
    @Id
    @Size(max = 50)
    @Column(name = "badge_id", nullable = false, length = 50)
    private String badgeId;

    @Column(name = "icon_minio_get_url")
    private String iconMinioGetUrl;

    @Column(name = "icon_minio_put_url")
    private String iconMinioPutUrl;

    @NotNull
    @ColumnDefault("NONE")
    @Column(name = "description", nullable = false)
    private String description;

    @Size(max = 100)
    @NotNull
    @Column(name = "create_user", nullable = false, length = 100)
    private String createUser;

    @NotNull
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "create_datetime", nullable = false)
    @JsonFormat(pattern = CoreConstants.DateTimePattern.FORMAT_24H)
    private LocalDateTime createDatetime;

    @Size(max = 100)
    @Column(name = "modify_user", length = 100)
    private String modifyUser;

    @Column(name = "modify_datetime")
    @JsonFormat(pattern = CoreConstants.DateTimePattern.FORMAT_24H)
    private LocalDateTime modifyDatetime;

    @OneToMany(mappedBy = "badge", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<ItemBadge> itemBadges;

}
