import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UploadService {
    isLoading = new Subject<number>();

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
                    const progress = (event.loaded / event.total * 100 );
                    this.isLoading.next(progress);
                }
            });
    }
}
