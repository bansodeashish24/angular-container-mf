import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/container-v1/shared/snackbar/snackbar.component';
@Injectable()
export class ModelSnackbarService {
	constructor(public snackBar: MatSnackBar) {
		//
	}
	barRef: any;
	openSnackbarComponent(msg: string, snackType: string, horizontalPos: any, verticalPos: any) {
		this.snackBar.openFromComponent(SnackbarComponent, {
			data: { message: msg, type: snackType },
			duration: 2000,
			panelClass: 'snackBar',
			horizontalPosition: horizontalPos,
			verticalPosition: verticalPos,
		});
	}

	close() {
		this.barRef.dismiss();
	}
}
