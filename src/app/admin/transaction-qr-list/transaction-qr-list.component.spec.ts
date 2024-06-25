import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionQrListComponent } from './transaction-qr-list.component';

describe('TransactionQrListComponent', () => {
  let component: TransactionQrListComponent;
  let fixture: ComponentFixture<TransactionQrListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionQrListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionQrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
