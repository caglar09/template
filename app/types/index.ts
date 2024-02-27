import { FirebaseStorageTypes } from "@react-native-firebase/storage";
import { AIModels } from "app/config";

export type ModelItemType = (typeof AIModels)[0];

export type FalApiResponse = {
	status: number;
	sucess: boolean;
	result: any;
	message?: string;
};

export type FalOutputResponse = {
	output: any;
	input: any;
	refs: FirebaseStorageTypes.Reference[];
};

export type OnboardItemData = {
	key: string;
	title: string;
	description: string;
	backgroundColor: string[];
	image: any;
	titleStyle: {
		color: string;
	};
	descriptionStyle: {
		color: string;
	};
	graidentOptions?: {
		start?: {
			x: number;
			y: number;
		};
		end?: {
			x: number;
			y: number;
		};
	};
};
export interface ImageDTO {
	uri: string;
	filename: string | null;
	extension: string | null;
	height: number | null;
	width: number | null;
	fileSize: number | null;
	playableDuration: number | null;
	orientation: number | null;
}

export enum InputTypes {
	"image" = "image",
	"number" = "number",
}
