import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: any,
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
  ) {
  }

  ngOnInit(): void {

  }

  confirmDeletion(state: boolean) {
    if (state) {
      this.dialogRef.close(state)
    }
  }
}
