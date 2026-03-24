package com.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.model.User;
import com.ecommerce.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    public User createUser(User user) {
        return repo.save(user);
    }

    public User getUser(Long id) {
        return repo.findById(id).orElse(null);
    }
}