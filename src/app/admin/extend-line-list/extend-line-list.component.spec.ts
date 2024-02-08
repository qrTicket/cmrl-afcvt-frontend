import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExtendLineListComponent } from './extend-line-list.component';

describe('ExtendLineListComponent', () => {
  let component: ExtendLineListComponent;
  let fixture: ComponentFixture<ExtendLineListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendLineListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendLineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
