import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UnassignListComponent } from './unassign-list.component';

describe('UnassignListComponent', () => {
  let component: UnassignListComponent;
  let fixture: ComponentFixture<UnassignListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UnassignListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
