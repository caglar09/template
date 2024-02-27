import React from "react";
import { StyleProp, ViewStyle } from "react-native";

export type CardProps = {
	children?: React.ReactNode | React.ReactElement;
	style?: StyleProp<ViewStyle>;
};
