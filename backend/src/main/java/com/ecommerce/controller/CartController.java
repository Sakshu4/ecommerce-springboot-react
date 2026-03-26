package com.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dto.CartRequest;
import com.ecommerce.model.Cart;
import com.ecommerce.service.CartService;

@RestController
@RequestMapping("/cart")

public class CartController {
	@Autowired
	private CartService cartService;
	private CartRequest cartRequest;
	
	@PostMapping("/add")
	public Cart addToCart(@RequestBody CartRequest cartRequest) {
		return cartService.addToCart(
				cartRequest.getUserId(),
				cartRequest.getProductId(),
				cartRequest.getQuantity()				
				);
	}
	
	@GetMapping("/{userId}")
	public Cart getCart(@PathVariable int userId) {
		return cartService.getCart(userId);
	}
}
