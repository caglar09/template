import { useGeneralStyles } from "app/assets";
import React from "react";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Animated, {
	SharedValue,
	interpolate,
	interpolateColor,
	useAnimatedStyle,
} from "react-native-reanimated";

import { OnboardItemData } from "app/types";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Text } from "../text";

const OnBoardingItem: React.FC<{
	item: OnboardItemData;
	index: number;
	animationValue: SharedValue<number>;
}> = ({ item, animationValue }) => {
	const { generalStyles } = useGeneralStyles();
	const { styles } = useStyles(onBoardItemStyle);
	const maskStyle = useAnimatedStyle(() => {
		const zIndex = interpolate(
			animationValue.value,
			[-1, 0, 1],
			[300, 0, -300]
		);

		const backgroundColor = interpolateColor(
			animationValue.value,
			[-1, 0, 1],
			["transparent", "transparent", "transparent"]
		);

		return {
			backgroundColor,
			zIndex,
		};
	}, [animationValue]);

	return (
		<LinearGradient
			colors={item.backgroundColor}
			style={[generalStyles.f1, styles.container]}
			start={item.graidentOptions?.start}
			end={item.graidentOptions?.end}
		>
			<Animated.View
				style={[
					maskStyle,
					generalStyles.positionAbsolute,
					generalStyles.w100Pe,
					generalStyles.h100Pe,
				]}
			/>
			<View
				style={[
					generalStyles.f1,
					generalStyles.fdRow,
					styles.cardImageContainer,
				]}
			>
				<Animated.Image
					source={item.image}
					style={[styles.cardImage]}
					resizeMode="cover"
				/>
			</View>
			<View style={[generalStyles.f1, generalStyles.algiCenter]}>
				<Text
					style={[
						generalStyles.headXL,
						generalStyles.mt40,
						generalStyles.textWhite,
					]}
				>
					{item.title}
				</Text>
				<Text
					style={[
						generalStyles.subHeadXXL,
						generalStyles.mt20,
						generalStyles.textWhite,
					]}
				>
					{item.description}
				</Text>
			</View>
		</LinearGradient>
	);
};

export { OnBoardingItem };

const onBoardItemStyle = createStyleSheet((theme) => ({
	container: {
		flex: 1,
		height: "100%",
		width: "100%",
		justifyContent: "center",
		borderRadius: 24,
		padding: 24,
	},
	dynamicBgColor: (color: string) => ({ backgroundColor: color }),
	cardImageContainer: {
		borderRadius: 24,
		overflow: "hidden",
	},
	cardImage: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
}));
