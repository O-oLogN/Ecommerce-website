package com.ecom.entities;

import com.ecom.constant.CoreConstants;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "item")
public class Item {
    @Id
    @Size(max = 50)
    @Column(name = "item_id", nullable = false, length = 50)
    private String itemId;

    @NotNull
    @Column(name = "category_id", nullable = false)
    private String categoryId;

    @Size(max = 100)
    @NotNull
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "price")
    private Float price;

    @Column(name = "image_minio_get_url")
    private String imageMinioGetUrl;

    @Column(name = "image_minio_put_url")
    private String imageMinioPutUrl;

    @NotNull
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "rate")
    private Float rate;

    @NotNull
    @Column(name = "number_of_reviews", nullable = false)
    private Integer numberOfReviews;

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

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<ItemHighlight> itemHighlights;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<ItemBadge> itemBadges;
    
    @Transient
    @JsonProperty("highlights")
    public Set<Highlight> getItemHighlights() {
        if (!itemHighlights.isEmpty()) {
            return itemHighlights.stream()
                .map(ItemHighlight::getHighlight)
                .collect(Collectors.toSet());
        }
        return Collections.emptySet();
    }

    @Transient
    @JsonProperty("badges")
    public Set<Badge> getBadges() {
        if (!itemBadges.isEmpty()) {
            return itemBadges.stream()
                    .map(ItemBadge::getBadge)
                    .collect(Collectors.toSet());
        }
        return Collections.emptySet();
    }
}