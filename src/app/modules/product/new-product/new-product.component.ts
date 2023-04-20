import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../shared/services/category.service';
import { ProductService } from '../../shared/services/product.service';
import { CategoryElement } from '../../category/components/category/category.component';

@Component({
	selector: 'app-new-product',
	templateUrl: './new-product.component.html',
	styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
	public productForm: FormGroup;
	estadoFormulario: string;
	categories: CategoryElement[] = [];
	selectedFile: any;
	nameImg: string = '';

	constructor(
		private fb: FormBuilder,
		private categoryService: CategoryService,
		private productService: ProductService,
		private dialogRef: MatDialogRef<NewProductComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.estadoFormulario = 'Agregar';

		this.productForm = this.fb.group({
			name: ['', Validators.required],
			price: ['', Validators.required],
			account: ['', Validators.required],
			category: ['', Validators.required],
			picture: ['', Validators.required],
		});

		if (data !== null) {
			// this.updateForm(data);
			this.estadoFormulario = 'Actualizar';
		}
	}

	ngOnInit(): void {
		this.getCategories();
	}

	onSave() {
		let data = {
			name: this.productForm.get('name')?.value,
			price: this.productForm.get('price')?.value,
			account: this.productForm.get('account')?.value,
			category: this.productForm.get('category')?.value,
			picture: this.selectedFile,
		};

    console.log(data);

		const uploadImageData = new FormData();
		uploadImageData.append('picture', data.picture, data.picture.name);
		uploadImageData.append('name', data.name);
		uploadImageData.append('price', data.price);
		uploadImageData.append('account', data.account);
		uploadImageData.append('categoryId', data.category);

		this.productService.saveProduct(uploadImageData).subscribe(
			(res: any) => {
				console.log(res);
				this.dialogRef.close(1);
			},
			(err: any) => {
				console.log(err);
        this.dialogRef.close(2);
			}
		);
	}

	onCancel() {
		this.dialogRef.close();
	}

	getCategories() {
		this.categoryService.getCategories().subscribe(
			(res: any) => {
				console.log(res);
				this.categories = res.categoryResponse.category;
			},
			(err: any) => {
				console.log(err);
			}
		);
	}

	onFileChange(event: any) {
		if (event.target.files.length > 0) {
			this.selectedFile = event.target.files[0];
			this.nameImg = this.selectedFile.name;
			// const file = event.target.files[0];
			// this.productForm.get('picture')?.setValue(file);
		}
	}
}
