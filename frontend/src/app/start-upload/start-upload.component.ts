import { Component } from '@angular/core';

import { UploadService } from './../upload.service';

@Component({
  selector: 'app-start-upload',
  templateUrl: './start-upload.component.html',
  styleUrls: ['./start-upload.component.scss']
})
export class StartUploadComponent {
  files: any = [];
  allowedFiles = ['image/jpeg', 'image/png', 'image/gif'];
  public errorMessage: string;

  constructor(private uploadService: UploadService) {}

  uploadFile(event) {
    const formData = new FormData();
    for (const index of event) {
      const element = event[index];
      this.files.push(element);
    }

    if (this.files[this.files.length - 1].size > 1024000) {
      this.errorMessage = 'Please insert a smaller image. The image must be less than 1024 kb';
    } else if (this.allowedFiles.indexOf(this.files[this.files.length - 1].type) === -1 ) {
      this.errorMessage = 'Please insert a JPG, PNG or GIF image. No other type of image are allowed';
    } else {
      formData.append('image', this.files[this.files.length - 1]);
      this.uploadService.uploadImage(formData);
    }
  }

}
