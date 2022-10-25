import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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
	expiration_date: string,
	cvv: string
}

export interface Address {
	address_id: number,
	user_id: number,
	state: string,
	city: string,
	street_address: string,
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

	product_microservice_url = "http://127.0.0.1:5000"
	user_microservice_url = "http://127.0.0.1:5000"
	order_microservice_url = ""

	constructor(private http: HttpClient) { }

	getProducts(): Observable<Product[]> {
		return this.http.get<Product[]>(this.product_microservice_url + "/products");
	}

	getProduct(product_id: number): Observable<Product|undefined> {
		return this.http.get<Product>(this.product_microservice_url + `/products/${product_id}`);
	}

	addProduct(product: Product): Observable<Product> {
		return this.http.post<Product>(this.product_microservice_url + "/products", product);
	}

	updateProduct(product: Product): Observable<Product> {
		return this.http.put<Product>(this.product_microservice_url + `/products/${product.product_id}`, product);
	}

	deleteProduct(product_id: number): Observable<Product> {
		return this.http.delete<Product>(this.product_microservice_url + `/products/${product_id}`);
	}

	getUsers(): Observable<User[]> {
		return this.http.get<User[]>(this.user_microservice_url + "/users");
	}

	getUser(user_id: number): Observable<User|undefined> {
		return this.http.get<User>(this.user_microservice_url + `/users/${user_id}`);
	}

	addUser(user: User): Observable<User> {
		return this.http.post<User>(this.user_microservice_url + "/users", user);
	}

	updateUser(user: User): Observable<User> {
		return this.http.put<User>(this.user_microservice_url + `/users/${user.user_id}`, user);
	}

	deleteUser(user_id: number): Observable<User> {
		return this.http.delete<User>(this.user_microservice_url + `/users/${user_id}`);
	}

	getCards(): Observable<Card[]> {
		return this.http.get<Card[]>(this.user_microservice_url + "/cards");
	}

	getCard(card_id: number): Observable<Card|undefined> {
		return this.http.get<Card>(this.user_microservice_url + `/cards/${card_id}`);
	}

	addCard(card: Card): Observable<Card> {
		return this.http.post<Card>(this.user_microservice_url + "/cards", card);
	}

	updateCard(card: Card): Observable<Card> {
		return this.http.put<Card>(this.user_microservice_url + `/cards/${card.card_id}`, card);
	}

	deleteCard(card_id: number): Observable<Card> {
		return this.http.delete<Card>(this.user_microservice_url + `/cards/${card_id}`);
	}

	getAddresses(): Observable<Address[]> {
		return this.http.get<Address[]>(this.user_microservice_url + "/addresses");
	}

	getAddress(address_id: number): Observable<Address|undefined> {
		return this.http.get<Address>(this.user_microservice_url + `/addresses/${address_id}`);
	}

	addAddress(address: Address): Observable<Address> {
		return this.http.post<Address>(this.user_microservice_url + "/addresses", address);
	}

	updateAddress(address: Address): Observable<Address> {
		return this.http.put<Address>(this.user_microservice_url + `/addresses/${address.address_id}`, address);
	}

	deleteAddress(address_id: number): Observable<Address> {
		return this.http.delete<Address>(this.user_microservice_url + `/addresses/${address_id}`);
	}

	getOrders(): Observable<Order[]> {
		let orders:Order[] = [
			{order_id: 1, user_id: 1, card_id: 1, address_id: 1, order_time: new Date(), total:100},
			{order_id: 2, user_id: 3, card_id: 2, address_id: 2, order_time: new Date(), total:20},
		]
		return of(orders);
		return this.http.get<Order[]>(this.order_microservice_url + "/orders");
	}

	getOrder(order_id: number): Observable<Order|undefined> {
		let orders:Order[] = [
			{order_id: 1, user_id: 1, card_id: 1, address_id: 1, order_time: new Date(), total:100},
			{order_id: 2, user_id: 3, card_id: 2, address_id: 2, order_time: new Date(), total:20},
		]
		let order = orders.find(order => order.order_id === order_id);
		return of(order);
		return this.http.get<Order>(this.order_microservice_url + `/orders/${order_id}`);
	}

	addOrder(order: Order): Observable<Order> {
		return this.http.post<Order>(this.order_microservice_url + "/orders", order);
	}

	updateOrder(order: Order): Observable<Order> {
		return this.http.put<Order>(this.order_microservice_url + "/orders", order);
	}

	deleteOrder(order_id: number): Observable<Order> {
		return this.http.delete<Order>(this.order_microservice_url + `/orders/${order_id}`);
	}

	getOrderItems(order_id: number): Observable<OrderItem[]> {
		let orderItems:OrderItem[] = [
			{order_id: 1, product_id: 6, quantity: 2},
			{order_id: 1, product_id: 1, quantity: 2},
			{order_id: 2, product_id: 1, quantity: 1},
		]
		let filteredOrderItems:OrderItem[] = orderItems.filter(item => item.order_id === order_id);
		return of(filteredOrderItems);
		return this.http.get<OrderItem[]>(this.order_microservice_url + `/orders/${order_id}/products`);
	}

	addOrderItem(order_item: OrderItem): Observable<OrderItem> {
		return this.http.post<OrderItem>(this.order_microservice_url + `/orders/${order_item.order_id}/products`, order_item);
	}	
}
