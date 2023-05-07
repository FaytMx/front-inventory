import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Chart } from 'chart.js';
import { ProductElement } from 'src/app/modules/product/product/product.component';
import { ProductService } from 'src/app/modules/shared/services/product.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	chartBar: any;
	chartDoughnut: any;

	constructor(private productService: ProductService) {}

	ngOnInit(): void {
		this.getProducts();
	}

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
		const nameProduct: String[] = [];
		const accountProduct: number[] = [];

		if ((resp.metadata[0].code = '00')) {
			let listProduct = resp.product.products;

			listProduct.forEach((product: ProductElement) => {
				nameProduct.push(product.name);
				accountProduct.push(product.account);
			});

			this.chartBar = new Chart('canvas-bar', {
				type: 'bar',
				data: {
					labels: nameProduct,
					datasets: [
						{
							label: 'Productos',
							data: accountProduct,
							backgroundColor: '#3F51B5',
							borderColor: '#3F51B5',
							borderWidth: 1,
						},
					],
				},
			});

			this.chartDoughnut = new Chart('canvas-doughnut', {
				type: 'doughnut',
				data: {
					labels: nameProduct,
					datasets: [
						{
							label: 'Productos',
							data: accountProduct,
							
						},
					],
				},
			});
		}
	}
}
