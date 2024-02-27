import { ENV, StorageKeys } from "app/config";
import { StorageHelper } from "app/utils";
import AxiosProvider from "axios";
console.log("ENV.API_URL", ENV.API_URL);

const api = AxiosProvider.create({
	baseURL: ENV.API_URL,
});

api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${StorageHelper.getString(
		StorageKeys.UserToken
	)}`;

	if (__DEV__) {
		const { baseURL, headers, data } = config;

		console.log("config", JSON.stringify({ baseURL, headers, data }, null, 4));
	}

	return config;
});

export default api;
