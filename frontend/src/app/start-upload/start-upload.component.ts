import { Component, OnInit } from '@angular/core';

import { UploadService } from './../upload.service';

@Component({
  selector: 'app-start-upload',
  templateUrl: './start-upload.component.html',
  styleUrls: ['./start-upload.component.scss']
})
export class StartUploadComponent implements OnInit {
  files: any = [];

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
  }

  uploadFile(event) {
    const formData = new FormData();
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element);
    }

    formData.append('image', this.files[this.files.length - 1]);
    this.uploadService.uploadImage(formData);
  }

}
