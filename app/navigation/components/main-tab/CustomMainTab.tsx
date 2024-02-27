import React, { useCallback, useState } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LayoutRectangle, TouchableOpacity, View } from "react-native";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { useGeneralStyles } from "app/assets";
import { Text } from "app/components";

const CustomMainTab = ({
	state,
	descriptors,
	insets,
	navigation,
}: BottomTabBarProps) => {
	const [layout, setLayout] = useState<LayoutRectangle | null>(null);
	const { styles, theme } = useStyles(stylesheet);
	const { generalStyles } = useGeneralStyles();

	const onTabPress = useCallback(
		(isFocused: boolean, route: (typeof state.routes)[0]) => {
			const event = navigation.emit({
				type: "tabPress",
				target: route.key,
				canPreventDefault: true,
			});

			if (!isFocused && !event.defaultPrevented) {
				navigation.navigate(route.name);
			}
		},
		[]
	);

	return (
		<Animated.View
			entering={SlideInDown}
			exiting={SlideOutDown}
			style={styles.tabbar}
			onLayout={(e) => setLayout(e.nativeEvent.layout)}
		>
			{/* {layout && <Animated.View style={[styles.activeTabBg, activeBgStyle]} />} */}

			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const isFocused = state.index === index;

				return (
					<TouchableOpacity
						key={route.name}
						style={[styles.tabItem, isFocused && styles.activeTabBg]}
						onPress={() => onTabPress(isFocused, route)}
					>
						{options.tabBarIcon?.({
							size: 20,
							color: isFocused ? theme.colors.activeTab : theme.colors.tabBg,
							focused: isFocused,
						})}

						<Text
							style={[styles.tabItemText(isFocused), generalStyles.subHeadXL]}
						>
							{route.name}
						</Text>
					</TouchableOpacity>
				);
			})}
		</Animated.View>
	);
};

export { CustomMainTab };

const stylesheet = createStyleSheet((theme) => ({
	tabbar: {
		backgroundColor: theme.colors.tabContainer,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderRadius: 24,
		marginBottom: 20,
		paddingVertical: 10,
		paddingHorizontal: 12,
		marginHorizontal: 16,
		borderTopWidth: 0,
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		height: 65,
	},
	tabItem: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		paddingVertical: 12,
	},
	tabItemText: (isFocused: boolean) => ({
		color: isFocused ? theme.colors.activeTab : theme.colors.text,
		marginLeft: 12,
	}),
	activeTabBg: {
		backgroundColor: theme.colors.activeTabBg,
		borderRadius: 16,
	},
}));
