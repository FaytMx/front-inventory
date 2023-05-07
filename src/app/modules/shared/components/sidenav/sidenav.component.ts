import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
	mobileQuery: MediaQueryList;
	username: string = '';

	menuNav = [
		{ name: 'Home', icon: 'home', route: 'home' },
		{ name: 'Categorías', icon: 'category', route: 'category' },
		{
			name: 'Productos',
			icon: 'production_quantity_limits',
			route: 'product',
		},
	];

	constructor(
		media: MediaMatcher,
		private keycloackService: KeycloakService
	) {
		this.mobileQuery = media.matchMedia('(max-width: 600px)');
	}

	ngOnInit(): void {
		this.username = this.keycloackService.getUsername();
	}

	logout() {
		this.keycloackService.logout();
	}
}
