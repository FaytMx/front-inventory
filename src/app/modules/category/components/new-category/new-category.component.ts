import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
	selector: 'app-new-category',
	templateUrl: './new-category.component.html',
	styleUrls: ['./new-category.component.css'],
})
export class NewCategoryComponent implements OnInit {
	public categoryForm: FormGroup;
	public estadoFormulario: string;

	constructor(
		private fb: FormBuilder,
		private categoryService: CategoryService,
		private dialogRef: MatDialogRef<NewCategoryComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.estadoFormulario = 'Agregar';
		this.categoryForm = this.fb.group({
			name: ['', Validators.required],
			description: ['', Validators.required],
		});

		if (data !== null) {
			this.updateForm(data);
			this.estadoFormulario = 'Actualizar';
		}
	}

	ngOnInit(): void {}

	onSave() {
		let data = {
			name: this.categoryForm.get('name')?.value,
			description: this.categoryForm.get('description')?.value,
		};

		if (this.data != null) {
			this.categoryService.updateCategory(this.data.id, data).subscribe(
				(resp: any) => {
					console.log(resp);
					this.dialogRef.close(1);
				},
				(error) => {
					console.log(error);
					this.dialogRef.close(2);
				}
			);
		} else {
			this.categoryService.saveCategory(data).subscribe(
				(resp: any) => {
					console.log(resp);
					this.dialogRef.close(1);
				},
				(error) => {
					console.log(error);
					this.dialogRef.close(2);
				}
			);
		}
	}

	onCancel() {
		this.dialogRef.close(3);
	}

	updateForm(data: any) {
		this.categoryForm.patchValue({
			name: data.name,
			description: data.description,
		});
	}
}
