import { Injectable, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UploaderService {

  // Tried removing baseURL
  baseURL = 'https://day25simple.herokuapp.com';

  constructor(private http: HttpClient) { }

  uploadArticle(form: NgForm, fileRef: ElementRef): Promise<any> {
    // Must be multipart/form-data
    const formData = new FormData();
    console.log(form.value.title);
    // Set formdata
    formData.set('title', form.value.title);
    formData.set('email', form.value.email);
    formData.set('article', form.value.article);
    formData.set('myImage', fileRef.nativeElement.files[0]);
    //
    return (
      this.http.post<any>(`/api/upload/article`, formData).toPromise()
    );
  }

  uploadMultipleImages(form: NgForm, fileRef: ElementRef): Promise<any> {
    const formData = new FormData();
    // Set formData
    for (let i = 0; i < fileRef.nativeElement.files.length; i++) {
      formData.set(`myImages${i + 1}`, fileRef.nativeElement.files[i]);
    }
    return (
      this.http.post<any>(`/api/upload/images`, formData).toPromise()
    );
  }

  retrieveImages(): Promise<any> {
    return (
      this.http.get<any>(`/api/get/images/all`).toPromise()
    );
  }
}
