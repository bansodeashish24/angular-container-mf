import { Injectable } from '@angular/core';
import * as cryptoJS from 'crypto-js/aes';
import * as encUTF8 from 'crypto-js/enc-utf8';
import { environment } from 'src/environments/environment';
import { Constants } from '../utils/constants';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
	setItem(key: string, value: any) {
		if (typeof value !== 'string') {
			value = JSON.stringify(value);
		}
		if (environment.production) {
			localStorage.setItem(key, cryptoJS.encrypt(value, Constants.LOCAL_ENCRYPTION_SECRET).toString());
		} else {
			localStorage.setItem(key, value);
		}
	}

	getItem(key: string) {
		const item = localStorage.getItem(key);
		if (item) {
			if (environment.production) {
				return cryptoJS.decrypt(item, Constants.LOCAL_ENCRYPTION_SECRET).toString(encUTF8);
			} else {
				return item;
			}
		}
		return null;
	}

	deleteItem(key: string) {
		localStorage.removeItem(key);
	}
}
