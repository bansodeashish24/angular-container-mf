import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	constructor(private http: HttpClient) {}

	handleResponse(apiResponse: any) {
		return apiResponse;
	}

	handleError(error: any, apiUrl?: string) {
		if (error.status === 401 || error.statusCode === 401 || error.response_data === 401) {
			// this.sharedService.openSnackBar(Constants.FAILURE, `Failed get response for ${url}!`);
		}
		return error;
	}

	callGetApi(apiUrl: string, requestParams?: any) {
		return this.http.get(apiUrl, {
			params: requestParams,
			headers: {
				Authorization: '',
			},
		});
	}

	callPostApi(apiUrl: string, body: any, options?: any) {
		return this.http.post(apiUrl, body, {
			headers: {
				Authorization: '',
			},
		});
	}

	callPostUploadApi(apiUrl: string, body: any, options?: any) {
		return this.http.post(apiUrl, body, {
			headers: {
				Authorization: '',
				Accept: '*/*',
			},
		});
	}

	callPostApiEncoded(apiUrl: string, body: any, options?: any) {
		return this.http.post(apiUrl, body, {
			headers: {
				Authorization: '',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});
	}

	callPutApi(apiUrl: string, body: any, params?: HttpParams) {
		return this.http.put(apiUrl, body, {
			headers: {
				Authorization: '',
			},
		});
	}

	callPatchApi(apiUrl: string, body: any, headers?: any) {
		let header = {
			Authorization: '',
		};

		if (headers) {
			header = headers;
		}
		return this.http.patch(apiUrl, body, {
			headers: header,
		});
	}

	callDeleteApi(apiUrl: string, params?: HttpParams) {
		return this.http.delete(apiUrl, {
			headers: {
				Authorization: '',
			},
		});
	}

	callGetFileApi(apiUrl: string, reqParams?: any) {
		return this.http.get(apiUrl, {
			responseType: 'blob',
			params: reqParams,
			headers: {
				Authorization: '',
			},
		});
	}

	prepareRequestParams(params: any) {
		if (!params) {
			return null;
		}
		let httpParams = new HttpParams();
		Object.keys(params).forEach((key) => {
			if (params[key] instanceof Object) {
				if (Object.keys(params[key]).length > 0) {
					httpParams = httpParams.append(key, JSON.stringify(params[key]));
				}
			} else if (params[key].toString().length > 0) {
				httpParams = httpParams.append(key, params[key]);
			}
		});
		return httpParams;
	}
}
