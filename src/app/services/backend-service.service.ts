import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
	product_id: number,
	name: string,
	category: string,
	price: number
}

export interface User {
	user_id: number,
	first_name: string,
	last_name: string
}

export interface Card {
	card_id: number,
	user_id: number,
	card_no: string,
	expiration_date: Date,
	cvv: string
}

export interface Address {
	address_id: number,
	user_id: number,
	state: string,
	city: string,
	zip_code: string
}

export interface Order {
	order_id: number,
	user_id: number,
	card_id: number,
	address_id: number,
	order_time: Date,
	total: number
}

export interface OrderItem {
	order_id: number,
	product_id: number,
	quantity: number
}

@Injectable({
	providedIn: 'root'
})
export class BackendServiceService {

	product_microservice_url = ""
	user_microservice_url = ""
	order_microservice_url = ""

	constructor(private http: HttpClient) { }

	getProducts(): Observable<Product[]> {
		return this.http.get<Product[]>(this.product_microservice_url + "/products");
	}

	getProduct(product_id: number): Observable<Product> {
		return this.http.get<Product>(this.product_microservice_url + `/products/${product_id}`);
	}

	addProduct(product: Product): Observable<Product> {
		return this.http.post<Product>(this.product_microservice_url + "/products", product);
	}

	getUsers(): Observable<User[]> {
		return this.http.get<User[]>(this.user_microservice_url + "/users");
	}

	getUser(user_id: number): Observable<User> {
		return this.http.get<User>(this.user_microservice_url + `/users/${user_id}`);
	}

	addUser(user: User): Observable<User> {
		return this.http.post<User>(this.user_microservice_url + "/users", user);
	}

	getCards(): Observable<Card[]> {
		return this.http.get<Card[]>(this.user_microservice_url + "/cards");
	}

	getCard(card_id: number): Observable<Card> {
		return this.http.get<Card>(this.user_microservice_url + `/cards/${card_id}`);
	}

	addCard(card: Card): Observable<Card> {
		return this.http.post<Card>(this.user_microservice_url + "/cards", card);
	}

	getAddresses(): Observable<Address[]> {
		return this.http.get<Address[]>(this.user_microservice_url + "/addresses");
	}

	getAddress(address_id: number): Observable<Address> {
		return this.http.get<Address>(this.user_microservice_url + `/addreses/${address_id}`);
	}

	addAddress(address: Address): Observable<Address> {
		return this.http.post<Address>(this.user_microservice_url + "/addresses", address);
	}

	getOrders(): Observable<Order[]> {
		return this.http.get<Order[]>(this.order_microservice_url + "/orders");
	}

	getOrder(order_id: number): Observable<Order> {
		return this.http.get<Order>(this.order_microservice_url + `/orders/${order_id}`);
	}

	addOrder(order: Order): Observable<Order> {
		return this.http.post<Order>(this.order_microservice_url + "/orders", order);
	}

	getOrderItems(order_id: number): Observable<OrderItem[]> {
		return this.http.get<OrderItem[]>(this.order_microservice_url + `/orders/${order_id}/products`);
	}

	addOrderItem(order_item: OrderItem): Observable<OrderItem> {
		return this.http.post<OrderItem>(this.order_microservice_url + `/orders/${order_item.order_id}/products`, order_item);
	}	
}
