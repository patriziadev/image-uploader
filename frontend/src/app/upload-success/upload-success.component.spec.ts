import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSuccessComponent } from './upload-success.component';

describe('UploadSuccessComponent', () => {
  let component: UploadSuccessComponent;
  let fixture: ComponentFixture<UploadSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
