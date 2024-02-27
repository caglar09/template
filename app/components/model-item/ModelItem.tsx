import { Card } from "@rneui/themed";
import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import LinearGradient from "react-native-linear-gradient";
import { Image } from "expo-image";

import { useGeneralStyles } from "app/assets";
import { ModelItemType } from "app/types";
import { IMAGE_BLURHASH } from "app/config";

const ModelItem: FC<{
	item: ModelItemType;
	index: number;
	onPress?: () => void;
}> = ({ item, index, onPress }) => {
	const { styles } = useStyles(modelItemStyle);
	const { generalStyles } = useGeneralStyles();
	const customAnimIn = FadeInDown.delay(10 * index).duration(500);
	const customAnimOut = FadeOutDown.delay(10 * index).duration(500);

	return (
		<Animated.View entering={customAnimIn} exiting={customAnimOut}>
			<TouchableOpacity activeOpacity={.8} onPress={onPress}>
				<Card containerStyle={styles.container}>
					<Image
						source={{ uri: item.image }}
						style={styles.cardImg}
						transition={1000}
						placeholder={IMAGE_BLURHASH}
					/>
					{/* <FastImage source={{ uri: item.image }} style={styles.cardImg} /> */}
					<View style={styles.body}>
						<View style={styles.content}>
							{/* <TouchableOpacity style={styles.categoryBadge}>
								<Text>{item.category}</Text>
							</TouchableOpacity> */}
						</View>
						<LinearGradient
							colors={["#00000040", "#00000040"]}
							style={styles.footer}
						>
							<Card.FeaturedTitle
								style={[styles.title, generalStyles.subHeadXL]}
							>
								{item.name}
							</Card.FeaturedTitle>
						</LinearGradient>
					</View>
				</Card>
			</TouchableOpacity>
		</Animated.View>
	);
};

export { ModelItem };

const modelItemStyle = createStyleSheet((theme) => ({
	container: {
		padding: 0,
		borderWidth: 0,
		borderRadius: 16,
		overflow: "hidden",
	},
	cardImg: {
		// position: "absolute",
		zIndex: -1,
		width: "100%",
		height: 175,
	},
	body: {
		position: "absolute",
		width: "100%",
		height: "100%",
	},
	content: {
		flex: 1,
		// flexDirection:"row",
		padding: 12,
	},
	footer: {
		flex: 0,
		paddingVertical: 12,
		paddingHorizontal: 12,
		// backgroundColor:"red"
	},
	title: {
		marginBottom: 0,
	},
	categoryBadge: {
		borderRadius: 12,
		paddingHorizontal: 12,
		paddingVertical: 6,
		backgroundColor: theme.colors.white,
		// flex:0
	},
}));
