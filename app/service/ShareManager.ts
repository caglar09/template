import { isAndroid } from "app/config";
import * as Sharing from "expo-sharing";
import { MediaManager } from "./MediaManager";

export class ShareManager {
	static async share(url: string, options?: Sharing.SharingOptions) {
		try {
			let uri = url;

			if (isAndroid) {
				const result = await MediaManager.downloadFileForAndroid(url);
				uri = result.uri;
			}

			await Sharing.shareAsync(uri, options);
			return Promise.resolve(true);
		} catch (error) {
			console.log("share error", error);
		} finally {
			return Promise.resolve(true);
		}
	}
}
