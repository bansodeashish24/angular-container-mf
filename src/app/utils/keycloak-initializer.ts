import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';

export function keyCloakInitializer(keycloak: KeycloakService): () => Promise<any> {
	return (): Promise<any> => {
		return new Promise(async (resolve, reject) => {
			try {
				await keycloak.init({
					config: environment.keyCloakConfiguration,
					initOptions: {
						onLoad: 'login-required',
						checkLoginIframe: false,
					},
					enableBearerInterceptor: false,
					bearerPrefix: '',
					bearerExcludedUrls: [],
				});
				resolve(true);
			} catch (error) {
				reject(error);
			}
		});
	};
}
