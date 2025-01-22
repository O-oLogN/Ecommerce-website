package com.admin.service.impl;

import com.admin.entities.User;
import com.admin.repository.UserDetailsRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserDetailsRepository userDetailsRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userRes = userDetailsRepository.findUserByUsername(username);
        if (userRes.isEmpty()) {
            throw new UsernameNotFoundException("Username not found!");
        }
        User user = userRes.get();
        return org.springframework.security.core.userdetails.User
                .builder()
                .username(username)
                .password(user.getPassword())
                .build();
    }
}
