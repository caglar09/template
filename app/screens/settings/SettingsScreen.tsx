import { View, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useThemeHelper } from "app/hooks";
import { Text } from "app/components";
import { useGeneralStyles } from "app/assets";

const SettingsScreen = () => {
	const { styles } = useStyles(stylesheet);
	const { generalStyles } = useGeneralStyles();
	const { toggleTheme } = useThemeHelper();
	return (
		<View style={[generalStyles.container, generalStyles.fajCenterItem]}>
			<Text>SettingsScreen</Text>
			<Text style={styles.welcomeText}>
				Open up App.js to start working on your app!
			</Text>

			<TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
				<Text style={styles.themeButtonText}>Change Theme</Text>
			</TouchableOpacity>
		</View>
	);
};

export { SettingsScreen };

const stylesheet = createStyleSheet((theme) => ({
	safearea: {
		flex: 1,
	},
	welcomeText: {
		color: theme.colors.text,
	},
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
		alignItems: "center",
		justifyContent: "center",
	},
	themeButton: {
		backgroundColor: theme.colors.text,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		borderRadius: 5,
		marginTop: 15,
	},
	themeButtonText: {
		color: theme.colors.background,
	},
}));
