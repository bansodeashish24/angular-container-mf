import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { KeycloakAuthGuardService } from 'src/app/services/keycloak-auth-guard.service';
import { ContainerV1Component } from './container-v1.component';
import { environment } from 'src/environments/environment';

export const CONTAINER_ROUTES: Routes = [
  {
    path: '',
    //canActivate: [KeycloakAuthGuardService],
    children: [
      {
        path: '',
        component: ContainerV1Component,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'child-micro-frontend-1-v1',
          },
          /*
          {
            path: 'dashboard',
            component: DashboardComponent,
            data: {
              breadcrumb: 'dashboard',
              breadcrumbPara: null,
              isDisabled: false,
            },
          },
          */
          {
            path: 'child-micro-frontend-1-v1',
            loadChildren: () =>
              loadRemoteModule({
                type: 'module',
                remoteEntry: `${environment.childMicroFrontend1Url}/remoteEntry.js`,
                exposedModule: './childMicroFrontend1V1', // this name should match the exported module name
              }).then((m) => m.ChildMicroFrontend1V1Module),
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'child-micro-frontend-1-v1',
  },
];
