import { View, Text as RnText, TextProps } from "react-native";
import React from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const Text: React.FC<TextProps> = (props) => {
	const { styles } = useStyles(textStyleSheet);
	return <RnText {...props} style={[styles.text, props?.style]} />;
};

export { Text };

const textStyleSheet = createStyleSheet((theme) => ({
	text: {
		color: theme.colors.text,
	},
}));
