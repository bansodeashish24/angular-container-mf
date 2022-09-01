import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './localstorage.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  defaultLanguageCode = 'en';
  currLangCode = 'en';
  currLang: any;
  languageChangeSubject = new Subject();

  constructor(
    private http: HttpClient,
    private _localstorageService: LocalStorageService,
    private router: Router
  ) {
    const presetLangCode =
      this._localstorageService.getItem('current-language');
    this.currLangCode = presetLangCode
      ? presetLangCode
      : this.defaultLanguageCode;
    this.setCurrentLanguage(this.currLangCode);
  }

  setCurrentLanguage(languageCode: string) {
    const presetLangCode =
      this._localstorageService.getItem('current-language');
    this.currLangCode = languageCode;
    this._localstorageService.setItem('current-language', languageCode);
    // broadcast language change event to child apps
    const langChangeEvent = new CustomEvent('change-language-event', {
      detail: { languageCode },
    });
    window.dispatchEvent(langChangeEvent);

    this.http
      .get(`/assets/i18n/container/${languageCode}.json`)
      .subscribe((languageJSON: any) => {
        this.currLang = languageJSON;
        this.languageChangeSubject.next(this.currLangCode);
        if (presetLangCode && presetLangCode !== this.currLangCode) {
          this.router.navigateByUrl('/container-v1/dashboard');
        }
      });
  }
}
