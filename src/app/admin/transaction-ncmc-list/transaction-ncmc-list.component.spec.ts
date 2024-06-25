import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionNcmcListComponent } from './transaction-ncmc-list.component';

describe('TransactionNcmcListComponent', () => {
  let component: TransactionNcmcListComponent;
  let fixture: ComponentFixture<TransactionNcmcListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionNcmcListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionNcmcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
