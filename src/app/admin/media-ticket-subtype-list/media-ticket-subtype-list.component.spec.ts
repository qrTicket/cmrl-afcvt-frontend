import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaTicketSubtypeListComponent } from './media-ticket-subtype-list.component';

describe('MediaTicketSubtypeListComponent', () => {
  let component: MediaTicketSubtypeListComponent;
  let fixture: ComponentFixture<MediaTicketSubtypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaTicketSubtypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaTicketSubtypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
