import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UploadService {
    isLoading = new Subject<boolean>();

    constructor( private http: HttpClient ){}

    uploadImage(imageFile) {
        return this.http.post(
            'http://localhost:3000/api/image',
            imageFile);
    }
}
