import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSubtypeListComponent } from './ticket-subtype-list.component';

describe('TicketSubtypeListComponent', () => {
  let component: TicketSubtypeListComponent;
  let fixture: ComponentFixture<TicketSubtypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketSubtypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketSubtypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
