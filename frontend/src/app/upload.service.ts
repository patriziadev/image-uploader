import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UploadService {

    constructor( private http: HttpClient ){}

    uploadImage(imageFile) {
        return this.http.post(
            'http://localhost:3000/api/image',
            imageFile);
    }
}
