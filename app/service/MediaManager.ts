import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import * as ExpoFS from "expo-file-system";

import { hasAndroidGalleryPermission } from "../utils/android-permission";
import { isAndroid } from "app/config";

export class MediaManager {
	static openCamera = () => {
		return launchCamera({
			mediaType: "photo",
			cameraType: "back",
			includeBase64: true,
			includeExtra: true,
			saveToPhotos: true,
			presentationStyle: "pageSheet",
		});
	};

	static openGallery = () => {
		return launchImageLibrary({
			mediaType: "photo",
			includeBase64: true,
			includeExtra: true,
			presentationStyle: "pageSheet",
			selectionLimit: 1,
		});
	};
	static downloadFileForAndroid = (uri: string) => {
		return ExpoFS.downloadAsync(
			uri,
			ExpoFS.cacheDirectory + uri.split("/").pop()
		);
	};

	static saveMediaToGallery = async (uri: string) => {
		try {
			const hasPermission = isAndroid
				? await hasAndroidGalleryPermission()
				: true;
			if (!hasPermission) {
				return;
			}

			let url = uri;

			if (isAndroid) {
				let downloadedFile = await this.downloadFileForAndroid(uri);
				url = downloadedFile.uri;
			}

			await CameraRoll.saveAsset(url, { type: "photo" });
		} catch (error) {
			console.log("saveMediaToGallery error", error);
		}
	};
}
