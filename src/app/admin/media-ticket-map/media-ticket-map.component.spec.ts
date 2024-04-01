import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaTicketMapComponent } from './media-ticket-map.component';

describe('MediaTicketMapComponent', () => {
  let component: MediaTicketMapComponent;
  let fixture: ComponentFixture<MediaTicketMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaTicketMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaTicketMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
