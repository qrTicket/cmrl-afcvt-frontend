import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSubtypeEditComponent } from './ticket-subtype-edit.component';

describe('TicketSubtypeEditComponent', () => {
  let component: TicketSubtypeEditComponent;
  let fixture: ComponentFixture<TicketSubtypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketSubtypeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketSubtypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
