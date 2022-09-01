import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SharedService {
	currentRoute = '';
	drawerSubject = new Subject();
	drawerDataSubject = new Subject();
	popupSubject = new Subject();
	spinnerSubject = new Subject<boolean>();

	sendDrawerDataToChild(drawerData: any) {
		const event = new CustomEvent('drawer-data-event', {
			detail: { drawerData },
		});
		window.dispatchEvent(event);
	}

	sendPopupDataToChild(popupData: any) {
		const event = new CustomEvent('pop-up-event', {
			detail: { popupData },
		});
		window.dispatchEvent(event);
	}
}
