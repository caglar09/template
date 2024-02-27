import { Image, ImageBackground } from "expo-image";
import React, { useCallback, useEffect, useState } from "react";
import { LayoutRectangle, TouchableOpacity } from "react-native";
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
} from "react-native-gesture-handler";
import { LinearGradient } from "react-native-linear-gradient";
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const SLIDER_SIZE = 5;
// prop olarak verilen bir fotoğrafın öncesini ve sonrasını gösteren reanimated'ı kullanarak bir component oluştur.
const EnchangeImageView = ({ beforeImage, afterImage }) => {
	const [layout, setLayout] = useState<LayoutRectangle | null>(null);

	const { styles } = useStyles(styleSheet);

	const position = useSharedValue(0);
	const leftVa = useSharedValue(0);
	const dxX = useSharedValue(0);
	const currentPos = useSharedValue(0);

	const tap = Gesture.Pan()
		.onStart((e) => {
			currentPos.value = position.value + e.translationX + SLIDER_SIZE;
		})
		.onChange((e) => {
			const { translationX, absoluteX, x, changeX } = e;

			const size = currentPos.value - translationX - SLIDER_SIZE;

			if (size > 0 && size <= layout.width - SLIDER_SIZE) {
				position.value = size;
			}
		})
		.onEnd((e) => {});


    const startAnimation=useCallback(
      () => {
        // position.value=witSp
      },
      [layout],
    )
    

	const sliderStyle = useAnimatedStyle(() => {
		if (layout) {
			const width = interpolate(
				position.value,
				[0, layout.width],
				[layout.width, 0]
			);

			return {
				width,
			};
		}
		return {};
	}, [position, layout]);

	useEffect(() => {
		position.value = 0;
	}, []);

	// useEffect(() => {
	// 	if (layout?.width) {
	// 		position.value = layout.width / 2;
	// 	}
	// }, [layout]);

	return (
		<GestureHandlerRootView
			style={styles.container}
			onLayout={(e) => {
				setLayout(e.nativeEvent.layout);
			}}
		>
			{layout && (
				<>
					<ImageBackground source={{ uri: afterImage }} style={styles.image}>
						<Animated.View style={[styles.beforeContainer, sliderStyle]}>
							<Image
								source={{ uri: beforeImage }}
								style={[styles.image, { minWidth: layout.width }]}
							/>

							<GestureDetector gesture={tap}>
								<LinearGradient
									colors={["#FFF", "#FFF"]}
									hitSlop={{
										left: 16,
										right: 16,
									}}
									style={[styles.slider, { width: SLIDER_SIZE }]}
								></LinearGradient>
							</GestureDetector>
						</Animated.View>
					</ImageBackground>
				</>
			)}
		</GestureHandlerRootView>
	);
};

export { EnchangeImageView };
const styleSheet = createStyleSheet({
	container: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	beforeContainer: {
		width: "100%",
		height: "100%",
		position: "absolute",
		zIndex: 1,
		overflow: "hidden",
		flexDirection: "row",
	},
	afterContainer: {
		width: "100%",
		height: "100%",
		position: "absolute",
		zIndex: 0,
	},
	image: {
		minWidth: "100%",
		height: "100%",
		resizeMode: "cover",
		position: "relative",
	},

	slider: {
		height: "100%",
		backgroundColor: "red", // Change color as needed
		position: "absolute",
		zIndex: 2,
		right: 0,
	},
});
