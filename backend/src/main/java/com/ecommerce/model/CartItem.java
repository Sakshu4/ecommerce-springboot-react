package com.ecommerce.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CartItem {
	@Id
	@GeneratedValue(strategy= GenerationType.AUTO)
	private long ciId;
	
	private long productId;
	private int quantity;
	public CartItem() {
		super();
	}
	
	public CartItem(long ciId, long productId, int quantity) {
		super();
		this.ciId = ciId;
		this.productId = productId;
		this.quantity = quantity;
	}
	
	public long getCiId() {
		return ciId;
	}
	public void setCiId(long ciId) {
		this.ciId = ciId;
	}
	public long getProductId() {
		return productId;
	}
	public void setProductId(long productId) {
		this.productId = productId;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	
	
	

}
