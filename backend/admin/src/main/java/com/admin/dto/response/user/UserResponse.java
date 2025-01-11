package com.admin.dto.response.user;

import com.admin.entities.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class UserResponse {
    private int size;
    private List<User> users;
}
