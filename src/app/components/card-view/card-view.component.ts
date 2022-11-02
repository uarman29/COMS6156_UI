import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    user_id: [, Validators.required],
    card_no: [, Validators.required],
    expiration_date: [, Validators.required],
    cvv: [, Validators.required]
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

  constructor(private backendService:BackendServiceService, private fb:FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.backendService.getCard(this.id).subscribe(card =>{
      if(card === undefined)
        this.router.navigate(['/cards']);
      else
        this.card = card;
      this.user_id.setValue(this.card.user_id);
      this.card_no.setValue(this.card.card_no);
      this.expiration_date.setValue(this.card.expiration_date);
      this.cvv.setValue(this.card.cvv);
    });
  }

  onUpdateSubmit() {
    if(!this.cardForm.valid){
      return;
    }
    let c:Card = {card_id: this.card.card_id, user_id: this.user_id.value, card_no: this.card_no.value, expiration_date: this.expiration_date.value, cvv: this.cvv.value};
    this.backendService.updateCard(c).subscribe();
    this.router.navigate(['/cards']);
  }

  onDelete() {
    this.backendService.deleteCard(this.card.card_id).subscribe();
    this.router.navigate(['/cards']);
  }

}
