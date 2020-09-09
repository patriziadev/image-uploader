import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartUploadComponent } from './start-upload.component';

describe('StartUploadComponent', () => {
  let component: StartUploadComponent;
  let fixture: ComponentFixture<StartUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
