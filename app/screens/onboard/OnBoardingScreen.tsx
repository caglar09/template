import { useGeneralStyles } from "app/assets";
import React, { useCallback, useState } from "react";
import { Dimensions, LayoutRectangle, View } from "react-native";
import Animated, {
	FadeIn,
	FadeOut,
	interpolate,
	useSharedValue,
} from "react-native-reanimated";

import { OnBoardingItem, OnBoardingPagination } from "app/components";
import { OnboardItemData } from "app/types";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Button } from "@rneui/themed";
import { useAppConfigStore } from "app/store";
import { StorageHelper } from "app/utils";
import { StorageKeys } from "app/config";
import { SafeAreaView } from "react-native-safe-area-context";

const data: OnboardItemData[] = [
	{
		key: "1",
		title: "RemoveBG AI",
		description:
			"Erase the Background, Bring it to the Foreground: Perfect Focus with Artificial Intelligence!",
		backgroundColor: ["#F880AB", "#FF9393"],
		image: require("../../assets/images/1.jpeg"),
		titleStyle: {
			color: "white",
		},
		descriptionStyle: {
			color: "white",
		},
		graidentOptions: {
			start: { x: 0, y: 0.5 },
			end: { x: 1, y: 0.5 },
		},
	},
	{
		key: "2",
		title: "Face Swap AI",
		description:
			"Change Your Face, Explore the World: A Brand New Perspective with Artificial Intelligence!",
		backgroundColor: ["#EE9F8E", "#EE9F8E"],
		image: require("../../assets/images/faceswap2.jpeg"),
		titleStyle: {
			color: "white",
		},
		descriptionStyle: {
			color: "white",
		},
		graidentOptions: {
			start: { x: 0, y: 0 },
			end: { x: 0, y: 0 },
		},
	},
	{
		key: "3",
		title: "Cool package 2",
		description: "This is a cool package",
		backgroundColor: ["#4353ff", "#4353ff"],
		image: require("../../../assets/images/icon.png"),
		titleStyle: {
			color: "white",
		},
		descriptionStyle: {
			color: "white",
		},
		graidentOptions: {
			start: { x: 0, y: 0 },
			end: { x: 0, y: 0 },
		},
	},
	{
		key: "4",
		title: "Cool package 4",
		description: "This is a cool package",
		backgroundColor: ["#4353ff", "#4353ff"],
		image: require("../../../assets/images/icon.png"),
		titleStyle: {
			color: "white",
		},
		descriptionStyle: {
			color: "white",
		},
		graidentOptions: {
			start: { x: 0, y: 0 },
			end: { x: 0, y: 0 },
		},
	},
];

const SPACING = 32;
const window = Dimensions.get("window");
const OnBoardingScreen = () => {
	const carouselRef = React.useRef<ICarouselInstance>(null);
	const [layout, setLayout] = useState<LayoutRectangle | null>(null);
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	const { styles, theme } = useStyles(onBoardContainerStyle);
	const { generalStyles } = useGeneralStyles();
	const translationValue = useSharedValue<number>(0);
	const { setOnBoarded } = useAppConfigStore();
	const isLastStep = currentIndex === data.length - 1;
	const PAGE_WIDTH = window.width - SPACING * 2;

	const fadeInAnim = FadeIn.delay(200).duration(500);

	const finish = useCallback(() => {
		StorageHelper.setBoolean(StorageKeys.OnBoarded, true);
		setOnBoarded(true);
	}, []);

	const animationStyle = React.useCallback(
		(value) => {
			"worklet";
			const translateX = interpolate(value, [-1, 0, 1], [-PAGE_WIDTH, 0, 0]);
			const zIndex = interpolate(value, [-1, 0, 1], [300, 0, -300]);
			const scale = interpolate(value, [-1, 0, 1], [1, 1, 0.85]);

			return {
				transform: [{ translateX }, { scale }],
				zIndex,
			};
		},
		[PAGE_WIDTH]
	);
	return (
		<SafeAreaView style={generalStyles.f1}>
			<View
				style={[
					generalStyles.f1,
					generalStyles.pv30,
					{ paddingHorizontal: SPACING },
				]}
			>
				<Animated.View
					style={[generalStyles.f1]}
					onLayout={(e) => setLayout(e.nativeEvent.layout)}
					entering={fadeInAnim}
					exiting={FadeOut}
				>
					{layout && (
						<Carousel
							ref={carouselRef}
							loop={false}
							style={{
								width: PAGE_WIDTH,
								justifyContent: "center",
								alignItems: "center",
							}}
							// mode="horizontal-stack"
							vertical={false}
							width={PAGE_WIDTH}
							data={data}
							onSnapToItem={(index) => {
								setCurrentIndex(index);
							}}
							renderItem={({ index, animationValue }) => (
								<OnBoardingItem
									item={data[index]}
									key={index}
									index={index}
									animationValue={animationValue}
								/>
							)}
							onProgressChange={(offsetProgress, absoluteProgress) =>
								(translationValue.value = offsetProgress)
							}
							// @ts-ignore
							customAnimation={animationStyle}
						/>
					)}
				</Animated.View>
				<View style={{ height: 180 }}>
					<OnBoardingPagination
						data={data}
						animationValue={translationValue}
						size={PAGE_WIDTH}
					/>

					<Button
						title={isLastStep ? "Finish" : "Next"}
						titleStyle={generalStyles.head4}
						buttonStyle={{
							backgroundColor: theme.colors.button,
							borderColor: "transparent",
							borderWidth: 0,
							borderRadius: 30,
							paddingVertical: 16,
						}}
						onPress={() => {
							if (isLastStep) {
								finish();
							} else carouselRef.current?.next();
						}}
						containerStyle={generalStyles.f1}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

const onBoardContainerStyle = createStyleSheet((theme) => ({
	container: {
		flex: 1,
		height: "100%",
		width: "100%",
		backgroundColor: theme.colors.background,
	},
}));

export { OnBoardingScreen };
