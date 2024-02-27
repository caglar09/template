import { StyleProp, ViewStyle } from "react-native";
import { Asset, ImagePickerResponse } from "react-native-image-picker";

export type ImageSelectProps = {
	selectedImage: string | null;
	onImageSelect: (image: Asset | null) => void;
	style?: StyleProp<ViewStyle>;
	text?: string;
};
