import { AxiosRequestConfig } from "axios";
import Api from "./api";

export const get = (url: string, config?: AxiosRequestConfig<any>) => {
	return Api.get(url, config);
};

// post
export const post = (
	url: string,
	data: any,
	config?: AxiosRequestConfig<any>
) => {
	return Api.post(url, data, config);
};

// put
export const put = (
	url: string,
	data: any,
	config?: AxiosRequestConfig<any>
) => {
	return Api.put(url, data, config);
};

// delete
export const del = (url: string, config?: AxiosRequestConfig<any>) => {
	return Api.delete(url, config);
};
