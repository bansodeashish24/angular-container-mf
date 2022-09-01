import { Component, OnInit, Inject } from '@angular/core';
// import { SnackbarsComponent } from '../snackbars.component';
// import { SnackbarsComponent } from '../snackbars.component';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
@Component({
	selector: 'app-snackbar',
	templateUrl: './snackbar.component.html',
	styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit {
	// message:string='';
	constructor(public sbRef: MatSnackBarRef<SnackbarComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: any) {}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	ngOnInit(): void {}
}
