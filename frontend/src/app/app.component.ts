import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { UploadService } from './upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'image-uploader';
  isLoading = false;

  constructor(private uploadService: UploadService){}

  ngOnInit() {
    this.uploadService.isLoading.subscribe( loadingStatus => {
      this.isLoading = loadingStatus;
    });
  }
}
