import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BackendServiceService, Card } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit {

  card!:Card;
  id!:number;

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

  constructor(
    private backendService:BackendServiceService,
    private fb:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.backendService.getCard(this.id).subscribe(response =>{
      if(response.status == 200) {
        if(response.body) {
          this.card = response.body;
          this.card_no.setValue(this.card.card_no);
          this.expiration_date.setValue(this.card.expiration_date);
          this.cvv.setValue(this.card.cvv);
        } else {
          this.router.navigate(['/cards']);
        }
      }
    }, err => {
      if(err.status == 400 || err.status == 403 || err.status == 404) {
        this.router.navigateByUrl("/cards");
      } else if(err.status == 401) {
        this.auth.logout();
      } else if(err.status == 500) {
        alert("Something went wrong");
        this.router.navigateByUrl("/cards");
      }
    });
  }

  onUpdateSubmit() {
    if(!this.cardForm.valid){
      return;
    }
    let c:Card = {card_id: this.card.card_id, user_id: 1, card_no: this.card_no.value, expiration_date: this.expiration_date.value, cvv: this.cvv.value};
    this.backendService.updateCard(c).subscribe(response => {
      if(response.status == 200){
        this.router.navigate(['/cards']);
      }
    }, err => {
      if(err.status == 400) {
        alert("Invalid input");
      } else if(err.status == 401) {
        this.auth.logout();
      } else if(err.status == 403 || err.status == 404) {
        this.router.navigateByUrl("/cards");
      } else if(err.status == 500) {
        alert("Something went wrong");
        this.router.navigateByUrl("/cards");
      }
    });
  }

  onDelete() {
    this.backendService.deleteCard(this.card.card_id).subscribe(response => {
      if(response.status == 200){
        this.router.navigate(['/cards']);
      }
    }, err => {
      if(err.status == 400) {
        alert("Invalid input");
      } else if(err.status == 401) {
        this.auth.logout();
      } else if(err.status == 403 || err.status == 404) {
        this.router.navigateByUrl("/cards");
      } else if(err.status == 500) {
        alert("Something went wrong");
        this.router.navigateByUrl("/cards");
      }
    });
  }

}
