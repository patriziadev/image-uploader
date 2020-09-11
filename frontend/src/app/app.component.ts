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
  public isLoading = 100;
  private isLoadingSubscription: Subscription;

  constructor(private uploadService: UploadService){}

  ngOnInit() {
    this.isLoadingSubscription = this.uploadService.isLoading.subscribe( progress => {
      this.isLoading = progress;
    });
  }

  ngOnDestroy() {
    this.isLoadingSubscription.unsubscribe();
  }
}
