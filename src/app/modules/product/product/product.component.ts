import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../shared/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import {
	MatSnackBar,
	MatSnackBarRef,
	SimpleSnackBar,
} from '@angular/material/snack-bar';
import { NewProductComponent } from '../new-product/new-product.component';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
	constructor(
		private productService: ProductService,
		public dialog: MatDialog,
		private snackBar: MatSnackBar
	) {}

	ngOnInit(): void {
		this.getProducts();
	}

	displayColumns: string[] = [
		'id',
		'name',
		'price',
		'account',
		'category',
		'picture',
		'actions',
	];
	dataSource = new MatTableDataSource<ProductElement>();

	@ViewChild(MatPaginator)
	paginator!: MatPaginator;

	getProducts() {
		this.productService.getProducts().subscribe(
			(data: any) => {
				console.log(data);
				this.processProductsResponse(data);
			},
			(error) => {
				console.log(error);
			}
		);
	}

	processProductsResponse(resp: any) {
		const dataProduct: ProductElement[] = [];
		if ((resp.metadata[0].code = '00')) {
			let listProduct = resp.product.products;

			listProduct.forEach((product: ProductElement) => {
				dataProduct.push({
					id: product.id,
					name: product.name,
					price: product.price,
					account: product.account,
					category: product.category,
					picture: 'data:image/jpeg;base64,' + product.picture,
				});
			});

			this.dataSource = new MatTableDataSource<ProductElement>(
				dataProduct
			);
			this.dataSource.paginator = this.paginator;
		}
	}

	edit(product: ProductElement) {
		const { id, name, price, account, category } = product;

		const dialogRef = this.dialog.open(NewProductComponent, {
			width: '450px',
			data:{id, name, price, account, category}
		});

		dialogRef.afterClosed().subscribe((result: any) => {
			if (result == 1) {
				this.openSnackBar('Producto editado', 'Exitosa');
				this.getProducts();
			} else if (result == 2) {
				this.openSnackBar(
					'Se produjo un error al editar producto',
					'Error'
				);
			}
		});
	}

	openProductDialog() {
		const dialogRef = this.dialog.open(NewProductComponent, {
			width: '450px',
		});

		dialogRef.afterClosed().subscribe((result: any) => {
			if (result == 1) {
				this.openSnackBar('Producto Agregada', 'Exitosa');
				this.getProducts();
			} else if (result == 2) {
				this.openSnackBar(
					'Se produjo un error al guardar producto',
					'Error'
				);
			}
		});
	}

	openSnackBar(
		message: string,
		action: string
	): MatSnackBarRef<SimpleSnackBar> {
		return this.snackBar.open(message, action, {
			duration: 2000,
		});
	}
}

export interface ProductElement {
	id: number;
	name: string;
	price: number;
	account: number;
	category: any;
	picture: any;
}
