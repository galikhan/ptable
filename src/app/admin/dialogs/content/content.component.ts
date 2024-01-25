import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Content} from "../../../interface/content";
import {ContentService} from "../../../service/content.service";
import { DiCodeData } from '../../constants/di-code-data';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  selectedFile: File | undefined;
  description!: string;
  content!: Content;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DiCodeData,
    private contentService: ContentService,
    public dialogRef: MatDialogRef<ContentComponent>,
  ) {
  }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data.content) {
      this.description = this.data.content.body;
    }
  }

  onSaveContent() {
    // Save the description if available
    if (this.description) {
      this.saveDescription();
    }

    // Check if a file is selected
    if (this.selectedFile) {
      // Handle the selected file
      console.log('Selected File:', this.selectedFile);
      // Add your logic to handle the file here

    } else {
      // Display a warning if no file is selected
      console.warn('No file selected.');
    }
  }

  saveDescription() {
    console.log(this.content);
    this.content = {id: 0, type: 'text', body: '', topic: this.data.topic};
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

  onFileChange(event: any) {
    // Get the selected file from the input
    this.selectedFile = event.target.files[0];
  }


}
