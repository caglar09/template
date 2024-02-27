import { Platform, Dimensions } from "react-native";
import AIModels from "../../models.json";

export { AIModels };

export const MMKV_HASH_KEY = "myaispace-hash-key";
export const StorageKeys = {
	Theme: "theme",
	OnBoarded: "isOnBoarded",
	UserToken: "userToken",
};

export const IMAGE_BLURHASH =
	"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const isAndroid = Platform.OS === "android";
export const isAboveIOS14 =
	Platform.OS === "ios" && Number(Platform.Version) >= 14;

export const ENV = {
	FAL_API_KEY: process.env.EXPO_PUBLIC_FAL_API_KEY,
	API_URL: process.env.EXPO_PUBLIC_API_URL,
};

export const PROXY_URL = ENV.API_URL + "fal/proxy";

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;
