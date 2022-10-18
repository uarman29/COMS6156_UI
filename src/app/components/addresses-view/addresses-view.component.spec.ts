import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressesViewComponent } from './addresses-view.component';

describe('AddressesViewComponent', () => {
  let component: AddressesViewComponent;
  let fixture: ComponentFixture<AddressesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
