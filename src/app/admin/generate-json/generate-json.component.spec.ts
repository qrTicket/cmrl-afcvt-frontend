import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateJsonComponent } from './generate-json.component';

describe('GenerateJsonComponent', () => {
  let component: GenerateJsonComponent;
  let fixture: ComponentFixture<GenerateJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateJsonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
