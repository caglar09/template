import { Modal, View } from "react-native";
import React from "react";

import { FullPageLoadingProps } from "./type";
import { Text } from "../text";
import LottieView from "lottie-react-native";
import { Animations, useGeneralStyles } from "app/assets";

const FullPageLoading: React.FC<FullPageLoadingProps> = ({
	visible,
	onRequestClose,
}) => {
	const { generalStyles, theme } = useGeneralStyles();
	return (
		<Modal
			transparent
			statusBarTranslucent
			visible={visible}
			style={{
				backgroundColor: theme.colors.fadedBlack70,
			}}
			onRequestClose={onRequestClose}
		>
			<LottieView
				source={Animations.loadingAnimation}
				autoPlay
				style={[
					generalStyles.f1,
					{
						backgroundColor: theme.colors.fadedBlack70,
					},
				]}
			/>
		</Modal>
	);
};

export { FullPageLoading };
