import * as ImageManipulator from "expo-image-manipulator";
import * as ExpoFS from "expo-file-system";
import storage from "@react-native-firebase/storage";
import { authStore } from "app/store";

export class ImageService {
	static parseNameFromPath = (path: string) => {
		const result = path.split("/");
		return result[result.length - 1];
	};

	static prepareImageRef = (imagePath: string) => {
		const authState = authStore.getState();
		const imageName = this.parseNameFromPath(imagePath);
		let path = `public/input/${imageName}`;
		if (authState.user) {
			path = `${authState.user.uid}/input/${imageName}`;
		}

		console.log("prepared image ref", path);

		return path;
	};
	static getInfo = async (imagePath: string) => {
		const info = await ExpoFS.getInfoAsync(imagePath);
		return info;
	};
	static getBase64File = async (url: string) => {
		const result = await ExpoFS.readAsStringAsync(url, { encoding: "base64" });
		return result;
	};
	// resize image
	static resizeImage = async (
		imagePath: string,
		width?: number,
		height?: number
	) => {
		const resizedImage = await ImageManipulator.manipulateAsync(
			imagePath,
			[
				// { resize: { width, height } }
			],
			{ compress: 1, format: ImageManipulator.SaveFormat.JPEG }
		);

		console.log(
			"file resized result",
			resizedImage.uri,
			`new Size: ${resizedImage.width}X${resizedImage.height}`
		);

		return resizedImage;
	};

	// upload image to firebase storage
	static uploadImageAndGetUrl = async (uri: string) => {
		console.log("file uplading to firebase storage", uri);

		const resizedImage = await this.resizeImage(uri);

		const preparedRef = this.prepareImageRef(resizedImage.uri);
		const fbStorageRef = storage().ref(preparedRef);

		// const response = await fetch(resizedImage.uri);
		// const blob = await response.blob();
		const snapshot = await fbStorageRef.putFile(resizedImage.uri, {
			customMetadata: {
				reelPath: uri,
				resizedPath: resizedImage.uri,
				name: this.parseNameFromPath(resizedImage.uri),
			},
		});
		await snapshot.task;
		const url = await fbStorageRef.getDownloadURL();
		console.log("Successfully uploaded URL: ", url);

		return { url, ref: fbStorageRef };
	};
}
