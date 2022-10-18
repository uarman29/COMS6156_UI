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

	product_microservice_url = ""
	user_microservice_url = ""
	order_microservice_url = ""

	constructor(private http: HttpClient) { }

	getProducts(): Observable<Product[]> {
		let products:Product[] = [
			{product_id: 1, name: "Shirt", category: "Clothing", price: 20}, 
			{product_id: 2, name: "TV", category: "Electronics", price: 200},
			{product_id: 3, name: "Sofa", category: "Furniture", price: 1000},
			{product_id: 4, name: "Computer", category: "Electronics", price: 1200},
			{product_id: 5, name: "Bodywash", category: "Health", price: 9},
			{product_id: 6, name: "Pants", category: "Clothing", price: 30}
		]
		return of(products);
		return this.http.get<Product[]>(this.product_microservice_url + "/products");
	}

	getProduct(product_id: number): Observable<Product|undefined> {
		let products:Product[] = [
			{product_id: 1, name: "Shirt", category: "Clothing", price: 20}, 
			{product_id: 2, name: "TV", category: "Electronics", price: 200},
			{product_id: 3, name: "Sofa", category: "Furniture", price: 1000},
			{product_id: 4, name: "Computer", category: "Electronics", price: 1200},
			{product_id: 5, name: "Bodywash", category: "Health", price: 9},
			{product_id: 6, name: "Pants", category: "Clothing", price: 30}
		]
		let product = products.find(product => product.product_id === product_id);
		return of(product);
		return this.http.get<Product>(this.product_microservice_url + `/products/${product_id}`);
	}

	addProduct(product: Product): Observable<Product> {
		return this.http.post<Product>(this.product_microservice_url + "/products", product);
	}

	updateProduct(product: Product): Observable<Product> {
		return this.http.put<Product>(this.product_microservice_url + "/products", product);
	}

	deleteProduct(product_id: number): Observable<Product> {
		return this.http.delete<Product>(this.product_microservice_url + `/products/${product_id}`);
	}

	getUsers(): Observable<User[]> {
		let users:User[] = [
			{user_id: 1, first_name: "James", last_name: "Cameron"}, 
			{user_id: 2, first_name: "Willy", last_name: "Mack"},
			{user_id: 3, first_name: "Polly", last_name: "Windsor"},
			{user_id: 4, first_name: "Maggie", last_name: "Moon"}
		]
		return of(users);
		return this.http.get<User[]>(this.user_microservice_url + "/users");
	}

	getUser(user_id: number): Observable<User|undefined> {
		let users:User[] = [
			{user_id: 1, first_name: "James", last_name: "Cameron"}, 
			{user_id: 2, first_name: "Willy", last_name: "Mack"},
			{user_id: 3, first_name: "Polly", last_name: "Windsor"},
			{user_id: 4, first_name: "Maggie", last_name: "Moon"}
		]
		let user = users.find(user => user.user_id === user_id);
		return of(user);
		return this.http.get<User>(this.user_microservice_url + `/users/${user_id}`);
	}

	addUser(user: User): Observable<User> {
		return this.http.post<User>(this.user_microservice_url + "/users", user);
	}

	updateUser(user: User): Observable<User> {
		return this.http.put<User>(this.user_microservice_url + "/users", user);
	}

	deleteUser(user_id: number): Observable<User> {
		return this.http.delete<User>(this.user_microservice_url + `/users/${user_id}`);
	}

	getCards(): Observable<Card[]> {
		let cards:Card[] = [
			{card_id: 1, user_id: 1, card_no: "1234123412341234", expiration_date: "02/27", cvv: "123"}, 
			{card_id: 2, user_id: 1, card_no: "5432543254325432", expiration_date: "03/26", cvv: "543"}, 
			{card_id: 3, user_id: 2, card_no: "1234567891234567", expiration_date: "09/25", cvv: "789"}
		]
		return of(cards);
		return this.http.get<Card[]>(this.user_microservice_url + "/cards");
	}

	getCard(card_id: number): Observable<Card|undefined> {
		let cards:Card[] = [
			{card_id: 1, user_id: 1, card_no: "1234123412341234", expiration_date: "02/27", cvv: "123"}, 
			{card_id: 2, user_id: 1, card_no: "5432543254325432", expiration_date: "03/26", cvv: "543"}, 
			{card_id: 3, user_id: 2, card_no: "1234567891234567", expiration_date: "09/25", cvv: "789"}
		]
		let card = cards.find(card => card.card_id === card_id);
		return of(card);
		return this.http.get<Card>(this.user_microservice_url + `/cards/${card_id}`);
	}

	addCard(card: Card): Observable<Card> {
		return this.http.post<Card>(this.user_microservice_url + "/cards", card);
	}

	updateCard(card: Card): Observable<Card> {
		return this.http.put<Card>(this.user_microservice_url + "/cards", card);
	}

	deleteCard(card_id: number): Observable<Card> {
		return this.http.delete<Card>(this.user_microservice_url + `/cards/${card_id}`);
	}

	getAddresses(): Observable<Address[]> {
		let addresses:Address[] = [
			{address_id: 1, user_id: 1, street_address: "817 Fulton Ave Apt 113", state: "NY", city: "NYC", zip_code:"10001"}, 
			{address_id: 2, user_id: 3, street_address: "123 Main Street Apt 167", state: "PA", city: "Philadephia", zip_code:"12783"}
		]
		return of(addresses);
		return this.http.get<Address[]>(this.user_microservice_url + "/addresses");
	}

	getAddress(address_id: number): Observable<Address|undefined> {
		let addresses:Address[] = [
			{address_id: 1, user_id: 1, street_address: "817 Fulton Ave Apt 113", state: "NY", city: "NYC", zip_code:"10001"}, 
			{address_id: 2, user_id: 3, street_address: "123 Main Street Apt 167", state: "PA", city: "Philadephia", zip_code:"12783"}
		]
		let address = addresses.find(address => address.address_id === address_id);
		return of(address);
		return this.http.get<Address>(this.user_microservice_url + `/addreses/${address_id}`);
	}

	addAddress(address: Address): Observable<Address> {
		return this.http.post<Address>(this.user_microservice_url + "/addresses", address);
	}

	updateAddress(address: Address): Observable<Address> {
		return this.http.put<Address>(this.user_microservice_url + "/addresses", address);
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
