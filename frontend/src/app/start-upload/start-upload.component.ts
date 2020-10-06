import { Component, OnInit } from '@angular/core';

import { UploadService } from './../upload.service';

@Component({
  selector: 'app-start-upload',
  templateUrl: './start-upload.component.html',
  styleUrls: ['./start-upload.component.scss']
})
export class StartUploadComponent implements OnInit {
  files: any = [];
  fileSize: number;
  allowedFiles = [];
  public errorMessage: string;

  constructor(private uploadService: UploadService) {}

  ngOnInit() {
    this.uploadService.uploadDetails().subscribe( responseData => {
      this.fileSize = responseData.fileSize;
      this.allowedFiles = responseData.fileTypes;
    });
  }

  uploadFile(event) {
    const formData = new FormData();
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element);
    }

    if (this.files[this.files.length - 1].size > this.fileSize * 1000) {
      this.errorMessage = 'Please insert a smaller image. The image must be less than' + this.fileSize + 'kb';
    } else if (this.allowedFiles.indexOf(this.files[this.files.length - 1].type) === -1 ) {
      this.errorMessage = 'Please insert a JPG, PNG or GIF image. No other type of image are allowed';
    } else {
      formData.append('image', this.files[this.files.length - 1]);
      this.uploadService.uploadImage(formData);
    }
  }

}
