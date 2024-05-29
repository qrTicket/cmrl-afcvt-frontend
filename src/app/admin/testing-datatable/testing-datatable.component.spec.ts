import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingDatatableComponent } from './testing-datatable.component';

describe('TestingDatatableComponent', () => {
  let component: TestingDatatableComponent;
  let fixture: ComponentFixture<TestingDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingDatatableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
