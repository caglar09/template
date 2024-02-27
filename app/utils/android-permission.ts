import { PermissionsAndroid, Platform } from "react-native";

const PlatformVersion = Platform.Version;
console.log("PlatformVersion", PlatformVersion);

export async function hasAndroidGalleryPermission() {
	const getCheckPermissionPromise = () => {
		if (
			Number.isInteger(PlatformVersion) &&
			(PlatformVersion as number) >= 33
		) {
			return Promise.all([
				PermissionsAndroid.check(
					PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
				),
				PermissionsAndroid.check(
					PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
				),
			]).then(
				([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
					hasReadMediaImagesPermission && hasReadMediaVideoPermission
			);
		} else {
			return Promise.all([
				PermissionsAndroid.check(
					PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
				),
				PermissionsAndroid.check(
					PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
				),
			]).then(
				([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
					hasReadMediaImagesPermission && hasReadMediaVideoPermission
			);
		}
	};

	const hasPermission = await getCheckPermissionPromise();
	if (hasPermission) {
		return true;
	}
	const getRequestPermissionPromise = () => {
		console.log("burası çalıştı");

		if (
			Number.isInteger(PlatformVersion) &&
			(PlatformVersion as number) >= 33
		) {
			console.log("WRITE_EXTERNAL_STORAGE");

			return PermissionsAndroid.requestMultiple([
				PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
				PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
			]).then(
				(statuses) =>
					statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
						PermissionsAndroid.RESULTS.GRANTED &&
					statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
						PermissionsAndroid.RESULTS.GRANTED
			);
		} else {
			return PermissionsAndroid.requestMultiple([
				PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
			]).then(
				(statuses) =>
					statuses[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
						PermissionsAndroid.RESULTS.GRANTED &&
					statuses[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
						PermissionsAndroid.RESULTS.GRANTED
			);
		}
	};

	return await getRequestPermissionPromise();
}
