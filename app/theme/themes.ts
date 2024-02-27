import { Theme, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { AnimationConfig } from "react-native-theme-switch-animation/src/types";

type SharedColors = {
	white: string;
	red: string;
	black: string;
	gray: string;
	green: string;
	bright0: string;
	bright: string;
	brighter: string;
	brightest: string;
	lightGrey: string;
	fadedBlack: string;
	fadedBlack70: string;
	fadedGray: string;
};

const sharedColors: SharedColors = {
	white: "#ffffff",
	red: "#ff0000",
	black: "#000000",
	gray: "#808080",
	green: "#14D98A",
	bright0: "#F5F5F5",
	bright: "#EBECEF",
	brighter: "#F4F5F7",
	brightest: "#FAFAFA",
	lightGrey: "#D9DCEB",

	fadedBlack: "#04040f40",
	fadedBlack70: "rgba(0,0,0, 0.7)",
	fadedGray: "rgba(4,4,15, 0.4)",
};

export interface MyTheme extends Theme {
	colors: Theme["colors"] &
		SharedColors & {
			tabContainer: string;
			tabBg: string;
			activeTabBg: string;
			activeTab: string;
			button: string;
			cardBg: string;
		};
	margins: Record<string, number>;
}

export const lightTheme: MyTheme = {
	colors: {
		...DefaultTheme.colors,
		...sharedColors,
		text: "#000000",
		background: "#f0f0f0",
		card: "#fff",
		tabContainer: "#fff",
		tabBg: "#44475C",
		activeTabBg: "#9E86FF12",
		activeTab: "#9E86FF",
		button: "#B260E9",
		cardBg: "#9E86FF25",
	},
	dark: false,
	margins: {
		sm: 2,
		md: 4,
		lg: 8,
		xl: 12,
	},
} as const;

export const darkTheme: MyTheme = {
	colors: {
		...DarkTheme.colors,
		...sharedColors,
		text: "#fafafa",
		background: "#181A20",
		card: "#1F2544",
		tabContainer: "#262361",
		tabBg: "#A9A4B0",
		activeTabBg: "#6f3df4",
		activeTab: "#fff",
		button: "#6f3df4",
		cardBg: "#6f3df425",
	},
	dark: true,
	margins: {
		sm: 2,
		md: 4,
		lg: 8,
		xl: 12,
	},
} as const;

export const darkThemeAnimationConfig: AnimationConfig = {
	type: "circular",
	duration: 400,
	startingPoint: {
		cxRatio: 0,
		cyRatio: 0,
	},
};
export const lightThemeAnimationConfig: AnimationConfig = {
	type: "circular",
	duration: 400,
	startingPoint: {
		cx: 0,
		cy: 0,
	},
};
// define other themes
