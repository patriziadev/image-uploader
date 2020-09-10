import { Component, OnInit, OnDestroy } from '@angular/core';

import { UploadService } from './../upload.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  public percentage = 0;
  private uploadServiceSubscription: Subscription;

  constructor(private uploadService: UploadService){}

  ngOnInit() {
    this.uploadServiceSubscription = this.uploadService.isLoading.subscribe( progress => {
      this.percentage = progress;
      console.log(this.percentage);
    });
  }

  ngOnDestroy() {
    this.uploadServiceSubscription.unsubscribe();
  }

}
