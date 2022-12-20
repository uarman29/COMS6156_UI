import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';
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
	img_url?: string,
	links?: Link[]
}

export interface User {
	user_id: number,
	email: string,
	name: string,
	links?: Link[]
}

export interface Card {
	card_id: number,
	user_id?: number,
	card_no: string,
	expiration_date: string,
	cvv: string,
	links?: Link[]
}

export interface Address {
	address_id: number,
	user_id?: number,
	state: string,
	city: string,
	street_address: string,
	zip_code: string,
	links?: Link[]
}

export interface Order {
	order_id: number,
	user_id?: number,
	email?:string,
	card_id: number,
	address_id: number,
	order_time: string,
	total: number,
	links?: Link[]
}

export interface OrderItem {
	order_id: number,
	product_id: number,
	quantity: number,
	links?: Link[]
}

export interface CartItem {
	user_id?: number,
	product_id: number,
	quantity: number,
	links?: Link[]
}

export interface ProductMap {
	[key: number]: Product;
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

	getProducts(params_object?:ParamMap): Observable<HttpResponse<Product[]>> {
		let params = new HttpParams()
		if(params_object) {
			params_object.keys.forEach(key =>{
				let val:string|null = params_object.get(key);
				if(val !== null)
					params = params.append(key, val)
			})
		}

		let options = {
			observe: 'response' as const,
			params: params,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.get<Product[]>(this.composite_microservice_url + "/composite-products", options);
	}

	getProduct(product_id: number): Observable<HttpResponse<Product>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.get<Product>(this.composite_microservice_url + `/composite-products/${product_id}`, options);
	}

	getUser(): Observable<HttpResponse<User>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.get<User>(this.composite_microservice_url + `/composite-user`, options);
	}

	updateUser(user: User): Observable<HttpResponse<User>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.put<User>(this.composite_microservice_url + `/composite-user`, user, options);
	}

	getCards(params_object?:ParamMap): Observable<HttpResponse<Card[]>> {
		let params = new HttpParams()
		if(params_object) {
			params_object.keys.forEach(key =>{
				let val:string|null = params_object.get(key);
				if(val !== null)
					params = params.append(key, val)
			})
		}

		let options = {
			observe: 'response' as const,
			params: params,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.get<Card[]>(this.composite_microservice_url + "/composite-cards", options);
	}

	getCard(card_id: number): Observable<HttpResponse<Card>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.get<Card>(this.composite_microservice_url + `/composite-cards/${card_id}`, options);
	}

	addCard(card: Card): Observable<HttpResponse<Card>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.post<Card>(this.composite_microservice_url + "/composite-cards", card, options);
	}

	updateCard(card: Card): Observable<HttpResponse<Card>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.put<Card>(this.composite_microservice_url + `/composite-cards/${card.card_id}`, card, options);
	}

	deleteCard(card_id: number): Observable<HttpResponse<Card>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.delete<Card>(this.composite_microservice_url + `/composite-cards/${card_id}`, options);
	}

	getAddresses(params_object?:ParamMap): Observable<HttpResponse<Address[]>> {
		let params = new HttpParams()
		if(params_object) {
			params_object.keys.forEach(key =>{
				let val:string|null = params_object.get(key);
				if(val !== null)
					params = params.append(key, val)
			})
		}

		let options = {
			observe: 'response' as const,
			params: params,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.get<Address[]>(this.composite_microservice_url + "/composite-addresses", options);
	}

	getAddress(address_id: number): Observable<HttpResponse<Address>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.get<Address>(this.composite_microservice_url + `/composite-addresses/${address_id}`, options);
	}

	addAddress(address: Address): Observable<HttpResponse<Address>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.post<Address>(this.composite_microservice_url + "/composite-addresses", address, options);
	}

	updateAddress(address: Address): Observable<HttpResponse<Address>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.put<Address>(this.composite_microservice_url + `/composite-addresses/${address.address_id}`, address, options);
	}

	deleteAddress(address_id: number): Observable<HttpResponse<Address>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.delete<Address>(this.composite_microservice_url + `/composite-addresses/${address_id}`, options);
	}

	getOrders(params_object?:ParamMap): Observable<HttpResponse<Order[]>> {
		let params = new HttpParams()
		if(params_object) {
			params_object.keys.forEach(key =>{
				let val:string|null = params_object.get(key);
				if(val !== null)
					params = params.append(key, val)
			})
		}

		let options = {
			observe: 'response' as const,
			params: params,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.get<Order[]>(this.composite_microservice_url + "/composite-orders", options);
	}

	getOrder(order_id: number): Observable<HttpResponse<Order>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.get<Order>(this.composite_microservice_url + `/composite-orders/${order_id}`, options);
	}

	addOrder(order: Order): Observable<HttpResponse<Order>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.post<Order>(this.composite_microservice_url + "/composite-orders", order, options);
	}

	placeOrder(order: Order): Observable<HttpResponse<Order>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.post<Order>(this.composite_microservice_url + "/placeorder", order, options);
	}

	updateOrder(order: Order): Observable<HttpResponse<Order>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.put<Order>(this.composite_microservice_url + `/composite-orders/${order.order_id}`, order, options);
	}

	deleteOrder(order_id: number): Observable<HttpResponse<Order>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.delete<Order>(this.composite_microservice_url + `/composite-orders/${order_id}`, options);
	}

	getOrderItems(order_id: number, params_object?: ParamMap): Observable<HttpResponse<OrderItem[]>> {
		let params = new HttpParams()
		if(params_object) {
			params_object.keys.forEach(key =>{
				let val:string|null = params_object.get(key);
				if(val !== null)
					params = params.append(key, val)
			})
		}

		let options = {
			observe: 'response' as const,
			params: params,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.get<OrderItem[]>(this.composite_microservice_url + `/composite-orders/${order_id}/items`, options);
	}

	addOrderItem(order_item: OrderItem): Observable<HttpResponse<OrderItem>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.post<OrderItem>(this.composite_microservice_url + `/composite-orders/${order_item.order_id}/items`, order_item, options);
	}	

	updateOrderItem(order_item: OrderItem): Observable<HttpResponse<OrderItem>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.put<OrderItem>(this.composite_microservice_url + `/composite-orders/${order_item.order_id}/items/${order_item.product_id}`, order_item, options);
	}

	deleteOrderItem(order_item: OrderItem): Observable<HttpResponse<OrderItem>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.delete<OrderItem>(this.composite_microservice_url + `/composite-orders/${order_item.order_id}/items/${order_item.product_id}`, options);
	}

	getCartItem(product_id: number): Observable<HttpResponse<CartItem>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.get<CartItem>(this.composite_microservice_url + `/composite-cart/items/${product_id}`, options);
	}

	getCartItems(params_object?:ParamMap): Observable<HttpResponse<CartItem[]>> {
		let params = new HttpParams()
		if(params_object) {
			params_object.keys.forEach(key =>{
				let val:string|null = params_object.get(key);
				if(val !== null)
					params = params.append(key, val)
			})
		}

		let options = {
			observe: 'response' as const,
			params: params,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.get<CartItem[]>(this.composite_microservice_url + `/composite-cart/items`, options);
	}

	addCartItem(cart_item: CartItem): Observable<HttpResponse<CartItem>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.post<CartItem>(this.composite_microservice_url + `/composite-cart/items`, cart_item, options);
	}	

	updateCartItem(cart_item: CartItem): Observable<HttpResponse<CartItem>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.put<CartItem>(this.composite_microservice_url + `/composite-cart/items/${cart_item.product_id}`, cart_item, options);
	}

	deleteCartItem(cart_item: CartItem): Observable<HttpResponse<CartItem>> {
		let options = {
			observe: 'response' as const,
			headers: new HttpHeaders()
				.set("Authorization", this.auth.getAPIKey())
		};
		return this.http.delete<CartItem>(this.composite_microservice_url + `/composite-cart/items/${cart_item.product_id}`, options);
	}
}
