import { Injectable } from '@angular/core';
import { ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';
import { Subject } from 'rxjs';
import { BreadCrumb } from '../models/models';
import { TranslationService } from './translation.service';
@Injectable({
	providedIn: 'root',
})
export class BreadcrumbService {
	public breadCrumbsSubject = new Subject<BreadCrumb[]>();

	constructor(private _t: TranslationService) {}

	createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadCrumb[] = []): any {
		const children: ActivatedRoute[] = route.children;
		if (children.length === 0 || route.firstChild?.outlet !== PRIMARY_OUTLET) {
			return breadcrumbs;
		}

		const child = route.firstChild;
		const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');
		if (routeURL !== '') {
			url += `/${routeURL}`;
		}

		if (child.snapshot.data) {
			const staticTitle = this._t.currLang?.sidebar[child.snapshot.data['breadcrumb']];
			const routeParam = child.snapshot.data['breadcrumbPara'];
			const isDisabled = child.snapshot.data['isDisabled'];
			if (routeParam) {
				breadcrumbs.push({ id: breadcrumbs.length, title: decodeURIComponent(child.snapshot.params[routeParam]), link: url, isDisabled });
			} else if (staticTitle) {
				breadcrumbs.push({ id: breadcrumbs.length, title: staticTitle, link: url, isDisabled });
			}
		}

		return this.createBreadcrumbs(child, url, breadcrumbs);
	}
}
