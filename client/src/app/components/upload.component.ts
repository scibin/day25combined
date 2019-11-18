import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UploaderService } from '../services/uploader.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  ImgArray = {
    bucketName: '',
    urls: []
  };

  // Inject the input:file as ElementRef
  // Reason is we need to access the DOM
  @ViewChild('imageFile', { static: false })
  imageFile: ElementRef;

  @ViewChild('imageFiles', { static: false })
  imageFiles: ElementRef;

  constructor(private uploadSvc: UploaderService) { }

  ngOnInit() {
  }

  submitArticle(form: NgForm) {
    // Use service to perform http POST
    this.uploadSvc.uploadArticle(form, this.imageFile)
    .then(() => {
      // console.info('Article uploaded');
      // Reset the form
      form.resetForm();
     })
    .catch(error => { console.error('upload error: ', error); });
  }

  submitImages(form: NgForm) {
    console.log('This is imageFiles: ', this.imageFiles);
    this.uploadSvc.uploadMultipleImages(form, this.imageFiles)
    .then(() => {
      // console.info('Images uploaded');
      form.resetForm();
    })
    .catch(error => { console.error('upload error: ', error); });
  }

  getAllImages() {
    this.uploadSvc.retrieveImages()
    .then(result => {
      // result is { bucketName: '...', data: [{...}, ....] }
      this.ImgArray = result;
      console.log(this.ImgArray);
    })
    .catch(err => {
      // !!! Consider routing to error page
      console.log('Error!', err);
    });
  }
}
