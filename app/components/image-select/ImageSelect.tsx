import FeatherIcon from "@expo/vector-icons/Feather";
import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { useGeneralStyles } from "app/assets";
import { isAndroid } from "app/config";
import { hasAndroidGalleryPermission } from "app/utils";
import { ImageSelectProps } from "./type";
import { Image } from "expo-image";
import { Text } from "../text";
import { MediaManager } from "app/service";

const ImageSelect = ({
	selectedImage,
	onImageSelect,
	style,
	text,
}: ImageSelectProps) => {
	const { generalStyles } = useGeneralStyles();
	const { styles, theme } = useStyles(imageSelectStyleSheet);
	useEffect(() => {
		if (isAndroid) {
			hasAndroidGalleryPermission();
		}
	}, []);

	const openGallery = async () => {
		try {
			const result = await MediaManager.openGallery();
			if (!result.didCancel) {
				onImageSelect?.(result.assets[0]);
			}
		} catch (error) {}
	};

	return (
		<TouchableOpacity
			style={[styles.selectContainer, style]}
			onPress={openGallery}
		>
			{selectedImage ? (
				<Image
					source={{ uri: selectedImage }}
					style={[generalStyles.f1, generalStyles.w100Pe, generalStyles.h100Pe]}
					contentFit="contain"
				/>
			) : (
				<View style={[generalStyles.fajCenterItem, generalStyles.f1]}>
					<FeatherIcon name="upload" size={36} color={theme.colors.button} />
					<Text
						style={[
							{ color: theme.colors.button },
							generalStyles.subHeadXL,
							generalStyles.mt8,
						]}
					>
						{text ?? "Upload"}
					</Text>
				</View>
			)}

			{selectedImage && (
				<TouchableOpacity
					onPress={() => onImageSelect?.(null)}
					style={styles.closeIcon}
				>
					<FeatherIcon name="x" size={24} color={theme.colors.white} />
				</TouchableOpacity>
			)}
		</TouchableOpacity>
	);
};

export { ImageSelect };

const imageSelectStyleSheet = createStyleSheet((theme) => ({
	selectContainer: {
		flex: 1,
		padding: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	closeIcon: {
		position: "absolute",
		zIndex: 1,
		right: 8,
		top: 8,
		padding: 4,
		borderRadius: 6,
		backgroundColor: theme.colors.fadedBlack70,
	},
}));
