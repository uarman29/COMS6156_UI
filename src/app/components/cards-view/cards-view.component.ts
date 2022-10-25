import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BackendServiceService, Card } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-cards-view',
  templateUrl: './cards-view.component.html',
  styleUrls: ['./cards-view.component.css']
})
export class CardsViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  cards: Card[] = [];
  displayedColumns:string[] = ["card_id", "user_id", "card_no", "expiration_date", "cvv"];
  dataSource!:MatTableDataSource<Card>;

  cardForm = this.fb.group({
    user_id: [0],
    card_no: [''],
    expiration_date: [''],
    cvv: ['']
  });

  get user_id() {
    return this.cardForm.get('user_id') as FormControl;
  }

  get card_no() {
    return this.cardForm.get('card_no') as FormControl;
  }

  get expiration_date() {
    return this.cardForm.get('expiration_date') as FormControl;
  }

  get cvv() {
    return this.cardForm.get('cvv') as FormControl;
  }


  constructor(private backendService:BackendServiceService, private fb:FormBuilder) { 
  }

  ngOnInit(): void {
    this.backendService.getCards().subscribe(cards =>{
      this.cards = cards;
      this.dataSource = new MatTableDataSource<Card>(this.cards);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
  }

  onSubmit() {
    if(!this.cardForm.valid){
      return;
    }
    let c:Card = {card_id: Math.max(...this.cards.map(card => card.card_id), 0) + 1, user_id: this.user_id.value, card_no: this.card_no.value, expiration_date: this.expiration_date.value, cvv: this.cvv.value};
    this.backendService.addCard(c).subscribe();
  }

}
