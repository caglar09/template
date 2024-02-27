import { NavigatorScreenParams } from "@react-navigation/native";
import { ModelItemType } from "app/types";

export type AppNavigation = {
	// Main: NavigatorScreenParams<MainTabNavigation>;
	Toolbox: NavigatorScreenParams<MainTabNavigation>;
	OnBoarding: undefined;
	Process: {
		model: ModelItemType;
	};
};

export type MainTabNavigation = {
	Tools: undefined;
	Settings: undefined;
};
