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

  uploadFile(event: File) {
    console.log(event);
    this.uploadService.uploadImage(event).subscribe( resData => {
      console.log(resData);
    });
    /* for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name);
      console.log(this.files);
    } */
  }

}
