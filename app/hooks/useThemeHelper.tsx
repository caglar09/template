import { StorageKeys } from "app/config";
import { darkThemeAnimationConfig, lightThemeAnimationConfig } from "app/theme";
import { StorageHelper } from "app/utils";
import { useCallback } from "react";
import switchTheme from "react-native-theme-switch-animation";
import { ThemeSwitcherHookProps } from "react-native-theme-switch-animation/src/types";
import { UnistylesRuntime } from "react-native-unistyles";

export const useThemeHelper = () => {
	const { setTheme, themeName } = UnistylesRuntime;

	const toggleTheme = useCallback(() => {
		const changerOpt: ThemeSwitcherHookProps = {
			switchThemeFunction: () => {
				let theme = themeName === "light" ? "dark" : "light";
				// @ts-ignore
				setTheme(theme);
				StorageHelper.set(StorageKeys.Theme, theme);
			},
			animationConfig:
				themeName === "light"
					? darkThemeAnimationConfig
					: lightThemeAnimationConfig,
		};
		switchTheme(changerOpt);
	}, [themeName]);
	return { toggleTheme, themeName };
};
