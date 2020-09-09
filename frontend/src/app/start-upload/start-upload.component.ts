import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-upload',
  templateUrl: './start-upload.component.html',
  styleUrls: ['./start-upload.component.scss']
})
export class StartUploadComponent implements OnInit {
  files: any = [];

  constructor() { }

  ngOnInit(): void {
  }

  uploadFile(event) {
    console.log(event);
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name);
      console.log(this.files);
    }
  }

}
