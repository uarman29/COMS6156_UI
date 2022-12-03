import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendServiceService, Card } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-cards-view',
  templateUrl: './cards-view.component.html',
  styleUrls: ['./cards-view.component.css']
})
export class CardsViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  cards: Card[] = [];
  displayedColumns:string[] = ["card_id", "card_no", "expiration_date", "cvv"];
  dataSource!:MatTableDataSource<Card>;

  cardForm = this.fb.group({
    card_no: [, Validators.required],
    expiration_date: [, Validators.required],
    cvv: [, Validators.required]
  });

  get card_no() {
    return this.cardForm.get('card_no') as FormControl;
  }

  get expiration_date() {
    return this.cardForm.get('expiration_date') as FormControl;
  }

  get cvv() {
    return this.cardForm.get('cvv') as FormControl;
  }


  constructor(private backendService:BackendServiceService, private fb:FormBuilder, private router:Router, private ar:ActivatedRoute) { 
  }

  updateData() {
    this.ar.queryParamMap.subscribe(params =>{
      this.backendService.getCards(params).subscribe(response =>{
        if(response.status == 200) {
          if(response.body) {
            this.cards = response.body
            this.dataSource.data = this.cards;
          } else
            this.router.navigate(['/']);
        }
      });
    });
  }

  ngOnInit(): void {
    $(".btn-close").on("click", function(){
      $("#card-add-success-alert").addClass("d-none");
    })

    this.ar.queryParamMap.subscribe(params =>{
      this.backendService.getCards(params).subscribe(response =>{
        if(response.status == 200) {
          if(response.body) {
            this.cards = response.body
            this.dataSource = new MatTableDataSource<Card>(this.cards);
        this.dataSource.paginator = this.paginator;
          } else
            this.router.navigate(['/']);
        }
      });
    });
  }

  onSubmit() {
    if(!this.cardForm.valid){
      return;
    }
    let c:Card = {card_id: Math.max(...this.cards.map(card => card.card_id), 0) + 1, user_id: 1, card_no: this.card_no.value, expiration_date: this.expiration_date.value, cvv: this.cvv.value};
    this.backendService.addCard(c).subscribe(response => {
      if(response.status == 200) {
        this.updateData();
        this.cardForm.reset();
        $("#card-add-success-alert").removeClass("d-none");
      }
    });
  }

}
