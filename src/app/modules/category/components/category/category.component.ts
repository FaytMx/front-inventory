import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
	constructor(private categoryService: CategoryService) {}

	ngOnInit(): void {
		this.getCategories();
	}

	displayColumns: string[] = ['id', 'name', 'description', 'actions'];
	dataSource = new MatTableDataSource<CategoryElement>();

	getCategories() {
		this.categoryService.getCategories().subscribe(
			(data: any) => {
				console.log(data);
				this.processCategoriesResponse(data);
			},
			(error) => {
				console.log(error);
			}
		);
	}

	processCategoriesResponse(resp: any) {
		const dataCategory: CategoryElement[] = [];
		if ((resp.metadata[0].code = '00')) {
			let listCategory = resp.categoryResponse.category;

			listCategory.forEach((category: CategoryElement) => {
				dataCategory.push({
					id: category.id,
					name: category.name,
					description: category.description,
				});
			});

			this.dataSource = new MatTableDataSource<CategoryElement>(
				dataCategory
			);
		}
	}
}

export interface CategoryElement {
	id: number;
	name: string;
	description: string;
}
