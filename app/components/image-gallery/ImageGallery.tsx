import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
	FlatList,
	LayoutRectangle,
	Modal,
	SafeAreaView,
	TouchableOpacity,
	View,
} from "react-native";
import {} from "react-native-safe-area-context";

import { useGeneralStyles } from "app/assets";
import { IMAGE_BLURHASH } from "app/config";
import { useGallery } from "app/hooks";
import { ImageDTO } from "app/types";
import { Image } from "expo-image";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Text } from "../text";

export type ImageGalleryProps = {
	multiple?: boolean;
	closeOnSelect?: boolean;
	onImageSelect: (photo: ImageDTO) => void;
};
export type ImageGalleryRefProps = {
	open: () => void;
	close: () => void;
};

const COLUMN_ITEMS = 4;

const ImageGallery = forwardRef<ImageGalleryRefProps, ImageGalleryProps>(
	({ onImageSelect, ...rest }, ref) => {
		const [isVisible, setVisible] = useState(false);
		const [layout, setLayout] = useState<LayoutRectangle | null>(null);
		const { generalStyles } = useGeneralStyles();
		const { styles } = useStyles(imageGalleryStyles);
		const { photos, hasNextPage, loadNextPagePictures, isLoadingNextPage } =
			useGallery({ pageSize: 100 });

		useImperativeHandle(
			ref,
			() => ({
				open: () => setVisible(true),
				close: () => setVisible(false),
			}),
			[isVisible]
		);

		return (
			<Modal visible={isVisible} onRequestClose={() => setVisible(false)}>
				<SafeAreaView
					onLayout={(e) => setLayout(e.nativeEvent.layout)}
					style={generalStyles.f1}
				>
					<View style={styles.header}>
						<Text>Images</Text>
					</View>
					{layout && (
						<FlatList
							data={photos}
							numColumns={COLUMN_ITEMS}
							style={generalStyles.f1}
							onEndReached={hasNextPage && loadNextPagePictures}
							renderItem={({ item: photo }) => (
								<TouchableOpacity
									style={{
										width: layout.width / COLUMN_ITEMS,
										height: layout.width / COLUMN_ITEMS,
									}}
								>
									<Image
										key={photo.uri}
										source={{ uri: photo.uri, thumbhash: IMAGE_BLURHASH }}
										style={{ width: "100%", height: "100%" }}
									/>
								</TouchableOpacity>
							)}
						/>
					)}
				</SafeAreaView>
			</Modal>
		);
	}
);

export { ImageGallery };

const imageGalleryStyles = createStyleSheet((theme) => ({
	header: {
		backgroundColor: theme.colors.gray,
		padding: 12,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
}));
