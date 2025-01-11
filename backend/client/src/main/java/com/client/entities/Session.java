package com.client.entities;

import com.client.constant.CoreConstants;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "session")
public class Session {
    @Id
    @Size(max = 50)
    @Column(name = "session_id", nullable = false, length = 50)
    private String sessionId;

    @NotNull
    @Column(name = "from_time", nullable = false)
    @JsonFormat(pattern = CoreConstants.DateTimePattern.FORMAT_24H)
    private LocalDateTime fromTime;

    @Column(name = "to_time")
    @JsonFormat(pattern = CoreConstants.DateTimePattern.FORMAT_24H)
    private LocalDateTime toTime;

    @NotNull
    @Column(name = "user_id")
    private String userId;

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

}