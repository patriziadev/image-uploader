import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

import { UploadService } from './upload.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'image-uploader';
  public isLoading = 0;
  private isLoadingSubscription: Subscription;
  errorMessage: string;

  constructor(private uploadService: UploadService){}

  ngOnInit() {
    this.isLoadingSubscription = this.uploadService.isLoading.subscribe( progress => {
      this.isLoading = progress;
    });

    this.uploadService.error.subscribe( error => {
      this.errorMessage = error;
    });
  }

  ngOnDestroy() {
    this.isLoadingSubscription.unsubscribe();
  }
}
