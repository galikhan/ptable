import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Content} from "../../../interface/content";
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DiCodeData,
    private contentService: ContentService,
    public dialogRef: MatDialogRef<ContentComponent>,
  ) {
  }

  ngOnInit(): void {
    if (this.data.content) {
      this.description = this.data.content.body;
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
    const childId = this.data.topic;
    const file = this.selectedFile;
    if (file) {
      this.contentService.uploadFile(file, childId).subscribe(response => {
        console.log('File upload successful:', response);
        // Handle success, if needed
      }, error => {
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
    console.log('videoUrl', this.videoUrl)
  }

  onFileChange(event: any) {
    // Get the selected file from the input
    this.selectedFile = event.target.files[0];
  }
}
