import { View, Text } from "react-native";
import React from "react";

import { CardProps } from "./type";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const Card: React.FC<CardProps> = ({ children, style }) => {
	const { styles } = useStyles(cardStyleSheet);

	return <View style={[styles.container, style]}>{children}</View>;
};

export { Card };

const cardStyleSheet = createStyleSheet((theme) => ({
	container: {
		borderRadius: 12,
		padding: 12,
	},
}));
