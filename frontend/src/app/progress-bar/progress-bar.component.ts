import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UploadService } from './../upload.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  public percentage = 0;
  private uploadServiceSubscription: Subscription;

  constructor(private uploadService: UploadService){}

  ngOnInit(): void {
    this.uploadService.isLoading.subscribe(progress => {
      console.log(progress);
    })
  }

  ngOnDestroy() {
    this.uploadServiceSubscription.unsubscribe();
  }

}
