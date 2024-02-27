import {
	BottomTabNavigationOptions,
	createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
	TransitionPresets,
	createStackNavigator,
	StackNavigationOptions,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import FeatherIcon from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {
	HomeScreen,
	SettingsScreen,
	OnBoardingScreen,
	ProcessScreen,
} from "app/screens";
import { useAppConfigStore } from "app/store";

import { CustomMainTab } from "./components";
import { useGeneralStyles } from "app/assets";
import { AppNavigation, MainTabNavigation } from "./type";
import { MyTheme } from "app/theme";
import { isAndroid } from "app/config";

const Tab = createBottomTabNavigator<MainTabNavigation>();
const Root = createStackNavigator<AppNavigation>();

const getNavigationDefaultOptions = <T extends any>(
	generalStyles: ReturnType<typeof useGeneralStyles>["generalStyles"],
	theme: MyTheme
) => {
	return {
		headerStyle: {
			backgroundColor: theme.colors.background,
		},
		headerTitleStyle: {
			color: theme.colors.text,
			...generalStyles.subHeadXL,
		},
		cardStyle: {
			backgroundColor: theme.colors.background,
		},

		headerBackImage: () => (
			<FeatherIcon
				name="chevron-left"
				size={24}
				style={generalStyles.ml0}
				color={theme.colors.text}
			/>
		),
	} as T;
};

export function Navigation() {
	const { generalStyles, theme } = useGeneralStyles();
	const defaultNavigationOptions =
		getNavigationDefaultOptions<BottomTabNavigationOptions>(
			generalStyles,
			theme
		);
	return (
		<Tab.Navigator
			screenOptions={{
				...defaultNavigationOptions,
				headerShown: true,
				headerTitleAlign: "left",
				headerShadowVisible: false,
			}}
			tabBar={(props) => <CustomMainTab {...props} />}
		>
			<Tab.Screen
				name="Tools"
				component={HomeScreen}
				options={{
					title: "My AI Space",
					tabBarIcon: ({ size, color }) => (
						<FontAwesome5 name="tools" size={size} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="Settings"
				component={SettingsScreen}
				options={{
					tabBarIcon: ({ size, color }) => (
						<FeatherIcon name="settings" size={size} color={color} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}

export function RootNavigation() {
	const { generalStyles, theme } = useGeneralStyles();
	const { isOnBoarded } = useAppConfigStore();
	const defaultNavigationOptions =
		getNavigationDefaultOptions<StackNavigationOptions>(generalStyles, theme);
	return (
		<NavigationContainer theme={theme}>
			<Root.Navigator
				screenOptions={{
					...defaultNavigationOptions,
					presentation: "modal",
					headerShown: true,
					headerBackTitleVisible: false,
					headerShadowVisible: false,
					headerTitleAlign: "center",
					gestureEnabled: true,
					...TransitionPresets.DefaultTransition,
				}}
			>
				{!isOnBoarded ? (
					<Root.Screen name="OnBoarding" component={OnBoardingScreen} />
				) : (
					// <Root.Screen name="Main" component={Navigation} />
					<Root.Screen name="Toolbox" component={HomeScreen} />
				)}
				<Root.Group
					screenOptions={{
						headerLeftContainerStyle: [
							!isAndroid && generalStyles.pl12,
							generalStyles.ml0,
							generalStyles.f0,
						],
						headerRightContainerStyle: [generalStyles.pr12, generalStyles.ml0],
					}}
				>
					<Root.Screen name="Process" component={ProcessScreen} />
				</Root.Group>
			</Root.Navigator>
		</NavigationContainer>
	);
}
