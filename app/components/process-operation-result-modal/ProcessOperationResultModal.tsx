import {
	View,
	Modal,
	SafeAreaView,
	ScrollView,
	LayoutRectangle,
	TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import { ProcessOperationResultModalProps } from "./type";
import { useProcessStore } from "app/store";
import { Text } from "../text";
import { useGeneralStyles } from "app/assets";
import { Image, ImageBackground } from "expo-image";
import { Button } from "@rneui/themed";
import { Feather } from "@expo/vector-icons";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { MediaManager, ShareManager } from "app/service";
import { EnchangeImageView } from "../enchange-image-view/EnchangeImageView";

const ProcessOperationResultModal: React.FC<
	ProcessOperationResultModalProps
> = () => {
	const [layout, setLayout] = useState<LayoutRectangle | null>(null);
	const { showResult, result, setShowResult, model } = useProcessStore();

	const { generalStyles, theme } = useGeneralStyles();
	const { styles } = useStyles(operationResultStyleSheet);

	const renderContent = () => {
		const imageView = (
			// <Image
			// 	source={{ uri: result.output.image.url }}
			// 	contentFit="scale-down"
			// 	style={generalStyles.f1}
			// />

			<EnchangeImageView
				beforeImage={result?.input?.image_url}
				afterImage={result?.output?.image?.url}
			/>
		);

		if (model.options.output?.background?.transparent) {
			return (
				<ImageBackground
					source={require("../../assets/images/transparent-grid.jpg")}
					style={generalStyles.f1}
					contentFit="fill"
				>
					{imageView}
				</ImageBackground>
			);
		}

		return imageView;
	};

	const saveMediaToGallery = async () => {
		await MediaManager.saveMediaToGallery(result?.output?.image?.url);
	};

	const shareMedia = async () => {
		await ShareManager.share(result?.output?.image?.url, {
			mimeType: result?.output?.image?.content_type,
			UTI: result?.output?.image?.content_type,
		});
	};

	return (
		<Modal
			visible={showResult}
			statusBarTranslucent={false}
			onRequestClose={() => setShowResult(false, null)}
		>
			{showResult && (
				<SafeAreaView style={[generalStyles.container]}>
					<View
						style={[[generalStyles.f1, generalStyles.ph12]]}
						onLayout={(e) => setLayout(e.nativeEvent.layout)}
					>
						<View
							style={[
								generalStyles.f0,
								generalStyles.pv12,
								generalStyles.fdRow,
								generalStyles.jcCenter,
								generalStyles.algiCenter,
							]}
						>
							<TouchableOpacity onPress={() => setShowResult(false, null)}>
								<Feather
									name="chevron-left"
									size={24}
									color={theme.colors.text}
								/>
							</TouchableOpacity>
							<Text
								style={[
									generalStyles.subHeadXL,
									generalStyles.f1,
									generalStyles.textCenter,
								]}
							>
								Result
							</Text>
							<View style={{ width: 24 }} />
						</View>
						<View
							style={[
								generalStyles.f1,
								generalStyles.jcCenter,
								generalStyles.ph12,
							]}
						>
							<View
								style={[styles.imageCard, styles.getImageContainerSize(layout)]}
							>
								{renderContent()}
							</View>
						</View>

						<View
							style={[
								generalStyles.f0,
								generalStyles.jcCenter,
								generalStyles.mb30,
							]}
						>
							<View
								style={[
									generalStyles.f0,
									generalStyles.jcCenter,
									generalStyles.fdRow,
									generalStyles.gap10,
								]}
							>
								<View style={[styles.actionBarContainer]}>
									<TouchableOpacity
										style={styles.actionBtn}
										onPress={shareMedia}
									>
										<Feather
											name="share-2"
											size={24}
											color={theme.colors.white}
										/>
										<Text style={generalStyles.textWhite}>Share</Text>
									</TouchableOpacity>
								</View>
								<View style={[styles.actionBarContainer]}>
									<TouchableOpacity
										style={styles.actionBtn}
										onPress={saveMediaToGallery}
									>
										<Feather
											name="download"
											size={24}
											color={theme.colors.white}
										/>
										<Text style={generalStyles.textWhite}>Save</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View>
				</SafeAreaView>
			)}
		</Modal>
	);
};

export { ProcessOperationResultModal };

const operationResultStyleSheet = createStyleSheet((theme) => ({
	imageCard: {
		// flex: 1,
		backgroundColor: theme.colors.cardBg,
		borderRadius: 16,
		overflow: "hidden",
	},
	getImageContainerSize: (layout: LayoutRectangle | null) => ({
		height: layout?.width ? layout.width * 1.3 : "auto",
	}),

	actionBarContainer: {
		flex: 1,
		borderRadius: 24,
		flexDirection: "column",
		justifyContent: "center",
		backgroundColor: theme.colors.button,
	},
	actionBtn: {
		backgroundColor: theme.colors.button,
		borderRadius: 24,
		paddingVertical: 16,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		gap: 12,
	},
}));
