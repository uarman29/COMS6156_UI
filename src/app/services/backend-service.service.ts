import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

export interface map {
	[key: string]: string;
}

export interface Link {
	rel: string,
	href: string
}

export interface Product {
	product_id: number,
	name: string,
	category: string,
	price: number,
	links?: Link[]
}

export interface User {
	user_id: number,
	first_name: string,
	last_name: string,
	links?: Link[]
}

export interface Card {
	card_id: number,
	user_id: number,
	card_no: string,
	expiration_date: string,
	cvv: string,
	links?: Link[]
}

export interface Address {
	address_id: number,
	user_id: number,
	state: string,
	city: string,
	street_address: string,
	zip_code: string,
	links?: Link[]
}

export interface Order {
	order_id: number,
	user_id: number,
	card_id: number,
	address_id: number,
	order_time: Date,
	total: number,
	links?: Link[]
}

export interface OrderItem {
	order_id: number,
	product_id: number,
	quantity: number,
	links?: Link[]
}

@Injectable({
	providedIn: 'root'
})
export class BackendServiceService {

	composite_microservice_url = environment.composite_microservice_url

	constructor(private http: HttpClient, private auth:AuthService) { }

	login() {
		window.location.href = this.composite_microservice_url + "/login";
	}

	logout() {
		window.location.href = this.composite_microservice_url + "/logout";
	}

	getProducts(params:Object = {}): Observable<HttpResponse<Product[]>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.get<Product[]>(this.composite_microservice_url + "/products", options);
	}

	getProduct(product_id: number): Observable<HttpResponse<Product>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.get<Product>(this.composite_microservice_url + `/products/${product_id}`, options);
	}

	getUser(): Observable<HttpResponse<User>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.get<User>(this.composite_microservice_url + `/user`, options);
	}
	/*
	addUser(user: User): Observable<User> {
		return this.http.post<User>(this.user_microservice_url + "/users", user);
	}

	updateUser(user: User): Observable<User> {
		return this.http.put<User>(this.user_microservice_url + `/users/${user.user_id}`, user);
	}

	deleteUser(user_id: number): Observable<User> {
		return this.http.delete<User>(this.user_microservice_url + `/users/${user_id}`);
	}
	*/

	getCards(params:Object = {}): Observable<HttpResponse<Card[]>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.get<Card[]>(this.composite_microservice_url + "/cards", options);
	}

	getCard(card_id: number): Observable<HttpResponse<Card>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.get<Card>(this.composite_microservice_url + `/cards/${card_id}`, options);
	}

	addCard(card: Card): Observable<HttpResponse<Card>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.post<Card>(this.composite_microservice_url + "/cards", card, options);
	}

	updateCard(card: Card): Observable<HttpResponse<Card>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.put<Card>(this.composite_microservice_url + `/cards/${card.card_id}`, card, options);
	}

	deleteCard(card_id: number): Observable<HttpResponse<Card>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.delete<Card>(this.composite_microservice_url + `/cards/${card_id}`, options);
	}

	getAddresses(params:Object = {}): Observable<HttpResponse<Address[]>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.get<Address[]>(this.composite_microservice_url + "/addresses", options);
	}

	getAddress(address_id: number): Observable<HttpResponse<Address>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.get<Address>(this.composite_microservice_url + `/addresses/${address_id}`, options);
	}

	addAddress(address: Address): Observable<HttpResponse<Address>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.post<Address>(this.composite_microservice_url + "/addresses", address, options);
	}

	updateAddress(address: Address): Observable<HttpResponse<Address>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.put<Address>(this.composite_microservice_url + `/addresses/${address.address_id}`, address, options);
	}

	deleteAddress(address_id: number): Observable<HttpResponse<Address>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.delete<Address>(this.composite_microservice_url + `/addresses/${address_id}`, options);
	}

	getOrders(params:Object = {}): Observable<HttpResponse<Order[]>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.get<Order[]>(this.composite_microservice_url + "/orders", options);
	}

	getOrder(order_id: number): Observable<Order|undefined> {
		return this.http.get<Order>(this.composite_microservice_url + `/orders/${order_id}`);
	}

	addOrder(order: Order): Observable<HttpResponse<Order>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.post<Order>(this.composite_microservice_url + "/orders", order, options);
	}

	updateOrder(order: Order): Observable<HttpResponse<Order>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.put<Order>(this.composite_microservice_url + `/orders/${order.order_id}`, order, options);
	}

	deleteOrder(order_id: number): Observable<HttpResponse<Order>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.delete<Order>(this.composite_microservice_url + `/orders/${order_id}`, options);
	}

	getOrderItems(order_id: number): Observable<HttpResponse<OrderItem[]>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.get<OrderItem[]>(this.composite_microservice_url + `/orders/${order_id}/items`, options);
	}

	addOrderItem(order_item: OrderItem): Observable<HttpResponse<OrderItem>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.post<OrderItem>(this.composite_microservice_url + `/orders/${order_item.order_id}/items`, order_item, options);
	}	

	updateOrderItem(order_item: OrderItem): Observable<HttpResponse<OrderItem>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.put<OrderItem>(this.composite_microservice_url + `/orders/${order_item.order_id}/items/${order_item.product_id}`, order_item, options);
	}

	deleteOrderItem(order_item: OrderItem): Observable<HttpResponse<OrderItem>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.delete<OrderItem>(this.composite_microservice_url + `/orders/${order_item.order_id}/items/${order_item.product_id}`, options);
	}
}
