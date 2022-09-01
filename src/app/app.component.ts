import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreadcrumbService } from './services/breadcrumb.service';
import { DataProviderService } from './services/data-provider.service';
import { SharedService } from './services/shared.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-container-mf';
  isSpinnerVisible = false;
  spinnerSubscription: any;

  constructor(
		private router: Router,
		public activatedRoute: ActivatedRoute,
		private sharedService: SharedService,
		private breadCrumbService: BreadcrumbService,
		private dataProviderService: DataProviderService
	) {
		this.initBreadcrumbsWatch();
	}


	ngOnInit() {
		// this.initBreadcrumbsWatch();
		window.addEventListener('route-event', this.redirectToRoute.bind(this), true);

		window.addEventListener('open-drawer-event', this.openGlobalDrawer.bind(this), true);

		window.addEventListener('open-popup-event', this.openPopup.bind(this), true);

		window.addEventListener('force-logout-event', this.forceLogout.bind(this), true);
		
		this.setupSpinnerListener();
	}

	initBreadcrumbsWatch() {
		this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
			const breadCrumbs = this.breadCrumbService.createBreadcrumbs(this.activatedRoute.root);
			this.breadCrumbService.breadCrumbsSubject.next(breadCrumbs);
			this.sharedService.currentRoute = this.router.routerState.snapshot.url;
		});
	}

	redirectToRoute(event: any) {
		this.router.navigateByUrl(event.detail.routePath);
	}
	openGlobalDrawer(event: any) {
		this.sharedService.drawerSubject.next(event.detail);
	}

	openPopup(event: any) {
		this.sharedService.popupSubject.next(event.detail);
	}

	forceLogout() {
		// force logout user
	}

	setupSpinnerListener() {
		this.spinnerSubscription = this.sharedService.spinnerSubject.subscribe(
			(value: boolean) => {
				setTimeout(() => {
					this.isSpinnerVisible = value;
				});
			}
		);
	}

	ngOnDestroy() {
		window.removeEventListener('route-event', this.redirectToRoute, true);
		window.removeEventListener('open-drawer-event', this.openGlobalDrawer, true);
		window.removeEventListener('open-popup-event', this.openPopup, true);
		window.addEventListener('force-logout-event', this.forceLogout.bind(this), true);
	}
}
