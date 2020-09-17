import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports : [
        HttpClientModule
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'image-uploader'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('image-uploader');
  });

  it('should use the progress value from the service', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const uploadService = fixture.debugElement.injector.get(AppComponent);
    fixture.detectChanges();
    expect(uploadService.isLoading).toEqual(app.isLoading);
  });

  it('should use the errorMessage from the service', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const uploadService = fixture.debugElement.injector.get(AppComponent);
    fixture.detectChanges();
    expect(uploadService.errorMessage).toEqual(app.errorMessage);
  });

  it('should not display the error if there is no message', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.errorMessage = '';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.error'))).toBeNull();
  });
});
