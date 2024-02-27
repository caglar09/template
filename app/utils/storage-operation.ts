import { MMKV } from "react-native-mmkv";
import { MMKV_HASH_KEY } from "app/config";

export const storage = new MMKV({
	id: `my-ai-space`,
	encryptionKey: MMKV_HASH_KEY,
});

const getAllKeys = () => {
	try {
		return storage.getAllKeys();
	} catch (e) {
		throw new Error(
			`An error occured when getting all keys : ${JSON.stringify(e)}`
		);
	}
};

const get = <T>(key: string) => {
	try {
		const jsonValue = storage.getString(key);

		return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
	} catch (e) {
		throw new Error(
			`An error occured when ${key} reading : ${JSON.stringify(e)}`
		);
	}
};
const getString = (key: string) => {
	try {
		const string = storage.getString(key);

		return string ?? null;
	} catch (e) {
		throw new Error(
			`An error occured when ${key} reading : ${JSON.stringify(e)}`
		);
	}
};
const getBoolean = (key: string) => {
	try {
		return storage.getBoolean(key);
	} catch (e) {
		throw new Error(
			`An error occured when ${key} reading : ${JSON.stringify(e)}`
		);
	}
};

const set = (key: string, value: string) => {
	try {
		storage.set(key, value);
		return true;
	} catch (e) {
		throw new Error(
			`An error occured when ${key} writing : ${JSON.stringify(e)}`
		);
	}
};

const setBoolean = (key: string, value: boolean) => {
	try {
		storage.set(key, value);
		return true;
	} catch (e) {
		throw new Error(
			`An error occured when ${key} writing : ${JSON.stringify(e)}`
		);
	}
};

const remove = (key: string) => {
	try {
		storage.delete(key);
		return true;
	} catch (e) {
		throw new Error(
			`An error occured when ${key} removing : ${JSON.stringify(e)}`
		);
	}
};

type PromisifyMethods<T> = {
	[P in keyof T]: T[P] extends (...args: infer A) => infer R
		? (...args: A) => Promise<R>
		: never;
};

type Storage = {
	getItem: (key: string) => string | null;
	setItem: (key: string, value: string) => void;
	removeItem: (key: string) => void;
};

const MMKVPromisifiedStorage: PromisifyMethods<
	Pick<Storage, "getItem" | "setItem" | "removeItem">
> = {
	getItem: (key: string) =>
		new Promise((resolve) => {
			resolve(get(key));
		}),
	setItem: (key: string, value: string) =>
		new Promise((resolve) => {
			set(key, value);
			resolve();
		}),
	removeItem: (key: string) =>
		new Promise((resolve) => {
			remove(key);
			resolve();
		}),
};
const StorageHelper = {
	storage,
	getAllKeys,
	getString,
	get,
	getBoolean,
	set,
	setBoolean,
	remove,
};

export { StorageHelper, MMKVPromisifiedStorage };
