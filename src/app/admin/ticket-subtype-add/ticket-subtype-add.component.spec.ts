import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSubtypeAddComponent } from './ticket-subtype-add.component';

describe('TicketSubtypeAddComponent', () => {
  let component: TicketSubtypeAddComponent;
  let fixture: ComponentFixture<TicketSubtypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketSubtypeAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketSubtypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
