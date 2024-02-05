import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { environment } from 'src/environments/environment';
import {Content, ContentVideo} from "../../../interface/content";
import {ContentService} from "../../../service/content.service";
import {DiCodeData} from '../../constants/di-code-data';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  selectedFile: File | undefined;
  description!: string;
  videoUrl!: string;
  content!: Content;
  contentVideo!: ContentVideo;
  imgUrl!: string;
  disabled = false;
  filename!:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DiCodeData,
    private contentService: ContentService,
    public dialogRef: MatDialogRef<ContentComponent>,
  ) {
  }

  ngOnInit(): void {
    if (this.data && this.data.content?.type === 'text') {
      this.description = this.data.content.body;
    } else if (this.data && this.data.content?.type === 'video') {
      this.videoUrl = this.data.content.body;
    }
  }

  onSaveContent(): void {
    // Save the description if available
    if (this.description) {
      this.saveDescription();
    }

    // Save the uploaded file if available
    if (this.selectedFile) {
      this.saveUploadedFile();
    }

    // Save the video URL if available
    if (this.videoUrl) {
      this.saveVideoUrl();
    }
  }


  saveUploadedFile() {

    this.content = {id: 0, type: 'image', body: '', topic: this.data.topic, editorLen: 5};
    if (this.data?.content) {
      this.content.id = this.data.content.id;
      this.content.isRemoved = false;
      this.content.body = this.filename;
      this.contentService.update(this.content).subscribe(result => {
        console.log('updated');
        this.dialogRef.close(true);
      });
    } else {
      this.content.body = this.filename;
      this.contentService.create(this.content).subscribe(result => {
        this.content = result;
        console.log('created');
        this.dialogRef.close(true);
      });
    }
  }

  uploadFile() {
    const childId = this.data.topic;
    const file = this.selectedFile;
    if (file) {
      this.contentService.uploadFile(file, childId).subscribe(response => {
        this.imgUrl = environment.domain + '/images/' + response.filename;
        this.disabled = false;
        this.filename = response.filename;
      }, error => {
        this.disabled = false;
        console.error('File upload failed:', error);
        // Handle error, if needed
      });
    }
  }

  saveDescription() {
    this.content = {id: 0, type: 'text', body: '', topic: this.data.topic, editorLen: 5};
    if (this.data?.content) {
      this.content.id = this.data.content.id;
      this.content.isRemoved = false;
      this.content.body = this.description;
      this.contentService.update(this.content).subscribe(result => {
        console.log('updated');
        this.dialogRef.close(true);
      });
    } else {
      this.content.body = this.description;
      this.contentService.create(this.content).subscribe(result => {
        this.content = result;
        console.log('created');
        this.dialogRef.close(true);
      });
    }
  }

  saveVideoUrl() {
    console.log('videoUrl', this.videoUrl);
    this.contentVideo = {id: 0, type: 'video', body: '', topic: this.data.topic, isRemoved: false};
    if (this.data?.content) {
      this.contentVideo.id = this.data.content.id;
      this.contentVideo.body = this.videoUrl;
      this.contentService.updateVideo(this.contentVideo).subscribe(result => {
        console.log('updated');
        this.dialogRef.close(true);
      });
    } else {
      this.contentVideo.body = this.videoUrl;
      this.contentService.createVideo(this.contentVideo).subscribe(result => {
        this.content = result;
        console.log('created');
        this.dialogRef.close(true);
      });
    }
  }

  onFileChange(event: any) {
    this.disabled = true;
    this.selectedFile = event.target.files[0];
    this.uploadFile();
  }
}
