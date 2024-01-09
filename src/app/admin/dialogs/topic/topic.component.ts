import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-topic',
	templateUrl: './topic.component.html',
	styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
	step = 0;
	myForm!: FormGroup;

	setStep(index: number) {
		this.step = index;
	}

	nextStep() {
		this.step++;
	}

	prevStep() {
		this.step--;
	}

	constructor(
		public dialogRef: MatDialogRef<TopicComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder
	) { }

	ngOnInit(): void {
		this.myForm = this.fb.group({
			topic: ['', Validators.required],
			subtopic: ['', Validators.required],
			descriptions: this.fb.array([
				this.initDescription()
			])
		});
	}

	initDescription(): FormGroup {
		return this.fb.group({
			description: ['', Validators.required],
			example: ['', Validators.required]
		});
	}

	closeModal(): void {
		this.dialogRef.close();
	}

	addDescription(): void {
		const control = this.myForm.get('descriptions') as FormArray;
		control.push(this.initDescription());
	}

	removeDescription(index: number): void {
		const control = this.myForm.get('descriptions') as FormArray;
		control.removeAt(index);
	}

	submitForm(): void {
		// Handle form submission
		console.log(this.myForm.value);
	}
}
