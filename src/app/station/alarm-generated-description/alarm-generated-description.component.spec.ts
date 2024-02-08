import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlarmGeneratedDescriptionComponent } from './alarm-generated-description.component';

describe('AlarmGeneratedDescriptionComponent', () => {
  let component: AlarmGeneratedDescriptionComponent;
  let fixture: ComponentFixture<AlarmGeneratedDescriptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmGeneratedDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmGeneratedDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
