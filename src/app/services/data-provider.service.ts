import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../utils/api-endpoints';
import { ApiService } from './api.service';
import { LocalStorageService } from './localstorage.service';
import { KeycloakService } from 'keycloak-angular';
import { from } from 'rxjs';

@Injectable()
export class DataProviderService {
  constructor(
    private apiService: ApiService,
    private keycloakAngular: KeycloakService,
    private _localStorageService: LocalStorageService
  ) {}

  /**
   * Test API function
   */
  getTestApi(): Observable<unknown> {
    return this.apiService.callGetApi(ApiEndpoints.METHOD_API_ENDPOINT_NAME);
  }
}
