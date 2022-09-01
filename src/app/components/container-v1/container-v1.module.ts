import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerV1Component } from './container-v1.component';
import { ModelSnackbarService } from 'src/app/services/model-snackbar.service';
import { CONTAINER_ROUTES } from './container-v1.routes';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [ContainerV1Component, SnackbarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CONTAINER_ROUTES),
    MatDialogModule,
    MatSnackBarModule,
    MatSidenavModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ModelSnackbarService],
})
export class ContainerV1Module {}
