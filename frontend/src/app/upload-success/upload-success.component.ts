import { Component, OnInit, OnDestroy } from '@angular/core';

import { UploadService } from './../upload.service';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-upload-success',
  templateUrl: './upload-success.component.html',
  styleUrls: ['./upload-success.component.scss']
})
export class UploadSuccessComponent implements OnInit, OnDestroy {
  public imageId: number;
  public imageUrl: string;
  private uploadServiceSubscription: Subscription;

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
    this.uploadServiceSubscription = this.uploadService.imageId.subscribe( id => {
      this.imageId = id;
      this.imageUrl = environment.serverUrl + '/api/image/' + id;
    });
  }

  ngOnDestroy() {
    this.uploadServiceSubscription.unsubscribe();
  }

  copyLink() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.imageUrl;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
