import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTypeEditComponent } from './ticket-type-edit.component';

describe('TicketTypeEditComponent', () => {
  let component: TicketTypeEditComponent;
  let fixture: ComponentFixture<TicketTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketTypeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
