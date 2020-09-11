import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UploadService {
    isLoading = new Subject<number>();
    imageId = new Subject<number>();

    constructor( private http: HttpClient ){}

    uploadImage(imageFile) {
        this.http.post(
            'http://localhost:3000/api/image',
            imageFile,
            {
                reportProgress: true,
                observe: 'events'
            }).subscribe( event => {
                if (event.type === HttpEventType.UploadProgress) {
                    const progress = Math.round(event.loaded / event.total * 100 );
                    this.isLoading.next(progress);
                }
                if (event.type === HttpEventType.Response) {
                    const response: any = event.body;
                    this.imageId.next(response.id);
                }
                console.log(event);
            });
    }
}
