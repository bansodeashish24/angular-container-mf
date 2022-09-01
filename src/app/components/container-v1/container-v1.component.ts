import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreadCrumb } from 'src/app/models/models';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { SharedService } from 'src/app/services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-container-v1',
  templateUrl: './container-v1.component.html',
  styleUrls: ['./container-v1.component.scss'],
})
export class ContainerV1Component implements OnInit {
  routerSubject: any;
  breadCrumbs: BreadCrumb[] = [];
  languageChangeSubject: any;
  popupShowSubject: any;
  drawerToggleSubject: any;
  drawerNumber = 1;
  drawerData: any;

  languages = [
    {
      text: 'English (UK)',
      value: 'en',
      isImage: true,
      imgSrc: 'assets/images/english.svg',
    },
    {
      text: 'Deutsch (GE)',
      value: 'de',
      isImage: true,
      imgSrc: 'assets/images/germany.svg',
    },
  ];

  selectedLanguage = {
    text: 'English (UK)',
    value: 'en',
    isImage: true,
    imgSrc: 'assets/images/english.svg',
  };

  @ViewChild('drawer') public drawer: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breadCrumbsService: BreadcrumbService,
    public sharedService: SharedService,
    private matDialog: MatDialog,
    private _localStorageService: LocalStorageService,
    public _t: TranslationService
  ) {}

  ngOnInit(): void {
    this.setupRouteChangeSubject();
    this.setupBreadcrumbSubject();
    this.setupLanguageChangeSubject();
    this.setupPopupShowSubject();
    this.setupDrawerToggleSubject();
    this.setInitialLanguage();
  }

  setupRouteChangeSubject() {
    this.routerSubject = this.router.events.subscribe((routeEvent) => {
      if (routeEvent instanceof NavigationEnd) {
        // any operation to be performed when redirected to the same page
      }
    });
  }

  setupBreadcrumbSubject() {
    if (this.breadCrumbs.length === 0) {
      this.breadCrumbs = this.breadCrumbsService.createBreadcrumbs(
        this.activatedRoute.root
      );
    }
    this.breadCrumbsService.breadCrumbsSubject.subscribe(
      (breadCrumbs: BreadCrumb[]) => {
        this.breadCrumbs = JSON.parse(JSON.stringify(breadCrumbs));
      }
    );
  }

  setupLanguageChangeSubject() {
    this.languageChangeSubject = this._t.languageChangeSubject.subscribe(() => {
      // any language specific translations to be performed
    });
  }

  setupPopupShowSubject() {
    this.popupShowSubject = this.sharedService.popupSubject.subscribe(
      (popupObject: any) => {
        if (popupObject.popupId === 1) {
          /*
          this.matDialog.open(ComponentToShowInDialog, {
            panelClass: 'your-custom-class-name',
          });
          */
        }
      }
    );
  }

  setupDrawerToggleSubject() {
    this.drawerToggleSubject = this.sharedService.drawerSubject.subscribe(
      (drawerObject: any) => {
        this.drawerNumber = drawerObject.drawerNumber;
        if (this.drawerNumber === 1) {
          this.drawerData = drawerObject.drawerData;
          this.drawer.toggle();
        }
      }
    );
  }

  setInitialLanguage() {
    const presetLangCode =
      this._localStorageService.getItem('current-language');
    const currLangCode = presetLangCode
      ? presetLangCode
      : this._t.defaultLanguageCode;
    this.selectedLanguage = this.languages.find(
      (language) => language.value === currLangCode
    )!;
  }

  onLanguageSelect(selectedLanguageCode: string) {
    this._t.setCurrentLanguage(selectedLanguageCode);
  }

  onBreadCrumbClick(event: any) {
    this.router.navigateByUrl(event.detail.link);
  }

  // you should call this method from within the drawer component while closing the drawer
  onDrawerClose() {
    const drawerData = {
      drawerNumber: 1,
      drawerData: {},
    };
    this.sharedService.sendDrawerDataToChild(drawerData);
  }

  // you should call this method from within the popup component while closing the popup
  onPopupClose() {
    const popupData = {};
    this.sharedService.sendPopupDataToChild(popupData);
  }

  ngOnDestory() {
    this.languageChangeSubject.unsubscribe();
    this.drawerToggleSubject.unsubscribe();
    this.routerSubject.unsubscribe();
    this.popupShowSubject.unsubscribe();
  }
}
