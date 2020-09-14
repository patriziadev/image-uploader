import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { environment } from '../environments/environment';

export interface ResponseBody {
    'success': boolean;
    'fileSize': number;
    'fileTypes': string[];
}

@Injectable({providedIn: 'root'})
export class UploadService {
    isLoading = new Subject<number>();
    imageId = new Subject<number>();
    error = new Subject<string>();

    constructor( private http: HttpClient ){}

    uploadImage(imageFile) {
        this.http.post<ResponseBody>(
            environment.serverUrl + '/api/image',
            imageFile,
            {
                reportProgress: true,
                observe: 'events'
            }).subscribe( event => {
                if (event.type === HttpEventType.UploadProgress) {
                    const progress = Math.round(event.loaded / event.total * 100 );
                    this.isLoading.next(progress);
                }
                if (event.type === HttpEventType.Response && event.ok === true) {
                    const response: any = event.body;
                    this.imageId.next(response.id);
                }
            },
            error => {
                this.error.next(error.error.message);
                this.isLoading.next(0);
            });
    }
}
