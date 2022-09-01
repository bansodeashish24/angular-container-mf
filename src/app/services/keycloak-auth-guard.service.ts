import { Injectable } from '@angular/core';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { LocalStorageService } from './localstorage.service';
import { from } from 'rxjs';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  UrlTree,
} from '@angular/router';
import { DataProviderService } from './data-provider.service';
@Injectable({
  providedIn: 'root',
})
export class KeycloakAuthGuardService
  extends KeycloakAuthGuard
  implements CanActivate
{
  constructor(
    protected override readonly router: Router,
    protected override readonly keycloakAngular: KeycloakService,
    private localStorageService: LocalStorageService,
    private dataProviderService: DataProviderService
  ) {
    super(router, keycloakAngular);
  }

  refreshToken: any = '';
  cliendId: any = '';

  // userProfile: any;

  isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    return new Promise((resolve, reject) => {
      if (!this.authenticated) {
        this.keycloakAngular.login().catch((e) => console.error(e));
        return reject(false);
      } else {
        from(this.keycloakAngular.getToken()).subscribe((token: any) => {
          this.refreshToken =
            this.keycloakAngular.getKeycloakInstance().refreshToken;
          this.cliendId = this.keycloakAngular.getKeycloakInstance().clientId;
          this.localStorageService.setItem('_clientId', this.cliendId);
          this.localStorageService.setItem('_accessToken', token);
          this.localStorageService.setItem('_refreshToken', this.refreshToken);
          this.localStorageService.setItem('_sessiontoken', token);
          this.localStorageService.setItem(
            '_clientId',
            this.keycloakAngular.getKeycloakInstance().clientId
          );
          this.localStorageService.setItem(
            '_refreshToken',
            this.keycloakAngular.getKeycloakInstance().refreshToken
          );
          from(this.keycloakAngular.loadUserProfile()).subscribe(
            (userProfile: any) => {
              // call internal authentication API for user information
              this.localStorageService.setItem(
                'firstName',
                userProfile.firstName
              );
              this.localStorageService.setItem(
                'lastName',
                userProfile.lastName
              );
              this.localStorageService.setItem('email', userProfile.email);
              this.setAdditionalUserDetails();
              return resolve(true);
            }
          );
        });
      }
    });
  }

  setAdditionalUserDetails() {
    // call backend API and set any other user details like userId etc if required.
  }
}
