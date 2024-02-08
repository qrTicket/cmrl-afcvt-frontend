import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SuperFooterComponent } from './super-footer.component';

describe('SuperFooterComponent', () => {
  let component: SuperFooterComponent;
  let fixture: ComponentFixture<SuperFooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
