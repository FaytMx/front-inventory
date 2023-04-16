import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../shared/services/product.service';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
	constructor(private productService: ProductService) {}

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
					category: product.category.name,
					picture: 'data:image/jpeg;base64,' + product.picture,
				});
			});

			this.dataSource = new MatTableDataSource<ProductElement>(
				dataProduct
			);
			this.dataSource.paginator = this.paginator;
		}
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
