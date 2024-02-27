import * as fal from "@fal-ai/serverless-client";
import { ENV, PROXY_URL } from "app/config";

import { FirebaseStorageTypes } from "@react-native-firebase/storage";

import { authStore } from "app/store";
import { FalOutputResponse, InputTypes, ModelItemType } from "app/types";
import { ImageService } from "./ImageService";

console.log("proxy url", PROXY_URL);

const fakeData = {
	output: {
		image: {
			url: "https://storage.googleapis.com/isolate-dev-hot-rooster_toolkit_bucket/3b66581443304677a6058cc38f9e7fd3.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=gke-service-account%40isolate-dev-hot-rooster.iam.gserviceaccount.com%2F20240226%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240226T171018Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&X-Goog-Signature=1c060eee7ce9bef4028d1884397ecfe80a9170cca05549156b03b6db1d315c3da0352373c78645381149f5be80f8054ddfb000e1017189d2c89fd9735d8d0730e770ebe7229e81a8960f2ec258ae35c624371dd9471454d3f0d58c9730d8d5d20c4b323eaadaa958cbc35519a943142451d53b9e9b5ce069b4a051fee73e1add65e528e9211b09072ad0f85a492e2557e26ea501b9095a98db37aa6c1b9082aa9546c105671ca2b8596c818a775a31f55fbf89505d777e38d24560fcaa78cbda562492d596d1cbd6fe1ae15dd86ceca9d9054409e75532a716af6717913b6bed65cb05bf6e229cdddc70c3ecff25238d5dcfa267d7af152c76b36ad8b795c259",
			content_type: "image/png",
			file_name: "164814c0d01a4ecd90452572538c1d89.png",
			file_size: 5123944,
			width: 1792,
			height: 2304,
		},
	},
	input: {
		image_url:
			"https://firebasestorage.googleapis.com/v0/b/myaispace-f5a2f.appspot.com/o/kjYMn5MwRibzyCyhZM2zDI5a0r33%2Finput%2FA0E2459E-0E88-4565-9538-9A76604148C2.jpg?alt=media&token=5af3b588-bb2c-44da-821b-8c7bc08dd671",
	},
	refs: [
		{
			path: "kjYMn5MwRibzyCyhZM2zDI5a0r33/input/A0E2459E-0E88-4565-9538-9A76604148C2.jpg",
			_storage: {
				_app: {
					_name: "[DEFAULT]",
					_deleted: false,
					_options: {
						appId: "1:770277292796:ios:a16eb8f612c93d26ff7579",
						messagingSenderId: "770277292796",
						storageBucket: "myaispace-f5a2f.appspot.com",
						apiKey: "AIzaSyBJrT530mUmOklwlds_FfxPiT4vFHxnDEo",
						projectId: "myaispace-f5a2f",
					},
					_automaticDataCollectionEnabled: true,
					_initialized: true,
					_nativeInitialized: true,
				},
				_nativeModule: {
					maxOperationRetryTime: 120000,
					maxUploadRetryTime: 600000,
					maxDownloadRetryTime: 600000,
				},
				_customUrlOrRegion: "gs://myaispace-f5a2f.appspot.com",
				_config: {
					statics: {
						StringFormat: {
							RAW: "raw",
							BASE64: "base64",
							BASE64URL: "base64url",
							DATA_URL: "data_url",
						},
						TaskEvent: { STATE_CHANGED: "state_changed" },
						TaskState: {
							RUNNING: "running",
							PAUSED: "paused",
							SUCCESS: "success",
							CANCELLED: "cancelled",
							ERROR: "error",
						},
					},
					version: "18.8.0",
					namespace: "storage",
					nativeEvents: ["storage_event"],
					nativeModuleName: "RNFBStorageModule",
					hasMultiAppSupport: true,
					hasCustomUrlOrRegionSupport: true,
					disablePrependCustomUrlOrRegion: true,
				},
				emulatorPort: 0,
				_maxUploadRetryTime: 600000,
				_maxDownloadRetryTime: 600000,
				_maxOperationRetryTime: 120000,
			},
		},
	],
};

fal.config({
	proxyUrl: PROXY_URL,
	requestMiddleware: (request) => {
		console.log("request", request.url, request.headers);

		return Promise.resolve(request);
	},
	responseHandler: async (response) => {
		console.log("status", response.status);
		if (response.status === 401) {
			// console.warn("Unauthorized for fal client");
		}

		const result = await response.json();

		return Promise.resolve(result);
	},
});

// promise delay
function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export class FalService {
	static get fal() {
		return fal;
	}

	static predict = async (
		model: ModelItemType,
		inputModel: Record<string, any>,
		subscribe?: (data: fal.QueueStatus) => void
	) => {
		// const imageInputs = model.input.filter((s) => s.type === InputTypes.image);

		// const copiedInput = { ...inputModel };

		// const operations = imageInputs.map(async (input) => {
		// 	const image = inputModel[input.name];
		// 	if (image) {
		// 		const result = await ImageService.uploadImageAndGetUrl(image);
		// 		copiedInput[input.name] = result.url;

		// 		return Promise.resolve(result.ref);
		// 	}
		// 	return Promise.resolve(false);
		// });
		// const uploadedFileRefs = await Promise.all(operations);

		// const result = await fal.subscribe<any, any>(model.version, {
		// 	...(model.extraFields ?? {}),
		// 	input: copiedInput,
		// 	logs: true,
		// 	onQueueUpdate: subscribe,
		// });
		// console.log("log", JSON.stringify(result, null, 4));
		// return {
		// 	output: result,
		// 	input: copiedInput,
		// 	refs: uploadedFileRefs.filter(
		// 		(ref) => ref !== false
		// 	) as FirebaseStorageTypes.Reference[],
		// } as FalOutputResponse;
		await delay(1000);
		return Promise.resolve(fakeData)
	};
}
