import React from "react";
import { View } from "react-native";
import Animated, {
	Extrapolation,
	SharedValue,
	interpolate,
	useAnimatedStyle,
} from "react-native-reanimated";

import { OnboardItemData } from "app/types";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const OnBoardingPagination = ({
	animationValue,
	data,
	size,
}: {
	data: OnboardItemData[];
	animationValue: SharedValue<number>;
	size: number;
}) => {
	const { styles } = useStyles(dotsStyle);

	return (
		<View style={[styles.container]}>
			{data.map((_, index) => {
				const animatedDotStyle = useAnimatedStyle(() => {
					const widthAnim = interpolate(
						animationValue.value * -1,
						// [-1, 0, 1],
						[(index - 1) * size, index * size, (index + 1) * size],
						[6, 24, 6],
						Extrapolation.CLAMP
					);
					const opacityAnimation = interpolate(
						animationValue.value * -1,
						[(index - 1) * size, index * size, (index + 1) * size],
						[0.5, 1, 0.5],
						Extrapolation.CLAMP
					);
					return {
						width: widthAnim,
						opacity: opacityAnimation,
					};
				});
				return (
					<Animated.View key={index} style={[styles.dot, animatedDotStyle]} />
				);
			})}
		</View>
	);
};

const dotsStyle = createStyleSheet((theme) => ({
	container: {
		flex: 1,
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		borderRadius: 24,
		padding: 24,
		columnGap: 6,
	},
	dot: {
		width: 24,
		height: 6,
		backgroundColor: theme.colors.white,
		borderRadius: 6,
	},
}));

export { OnBoardingPagination };
