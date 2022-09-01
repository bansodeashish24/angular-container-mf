import { TestBed } from '@angular/core/testing';

import { ModelSnackbarService } from './model-snackbar.service';

describe('ModelSnackbarService', () => {
	let service: ModelSnackbarService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ModelSnackbarService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
