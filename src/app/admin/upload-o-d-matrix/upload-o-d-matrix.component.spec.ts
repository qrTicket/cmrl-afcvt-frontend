import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadODMatrixComponent } from './upload-o-d-matrix.component';

describe('UploadODMatrixComponent', () => {
  let component: UploadODMatrixComponent;
  let fixture: ComponentFixture<UploadODMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadODMatrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadODMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
