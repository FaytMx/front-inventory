import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from '../category/components/category/category.component';

const childRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'category', component: CategoryComponent },
];

@NgModule({
	imports: [RouterModule.forChild(childRoutes)],
	exports: [],
})
export class RouterChildModule {}
