package com.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dto.OrderRequest;
import com.ecommerce.model.Cart;
import com.ecommerce.model.Order;
import com.ecommerce.service.CartService;
import com.ecommerce.service.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {
	@Autowired
	private CartService cartService ; 
	
	@Autowired
	private OrderService orderService ;
	
	@PostMapping
	public Order placeOrder(@RequestBody OrderRequest request) {
		Cart cart = cartService.getCart(request.getUserId());
		return orderService.placeOrder(cart);
	}
	
}
