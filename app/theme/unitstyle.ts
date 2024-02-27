import { UnistylesRegistry } from "react-native-unistyles";
import { breakpoints } from "./breakpoints";
import { lightTheme, darkTheme } from "./themes";
import { StorageHelper } from "app/utils";
import { StorageKeys } from "app/config";

type AppBreakpoints = typeof breakpoints;
type AppThemes = {
	light: typeof lightTheme;
	dark: typeof darkTheme;
};

declare module "react-native-unistyles" {
	export interface UnistylesBreakpoints extends AppBreakpoints {}
	export interface UnistylesThemes extends AppThemes {}
}

export const bootstrapUnistyle = () => {
	let initialTheme = StorageHelper.getString(StorageKeys.Theme);

	if (!initialTheme) {
		initialTheme = "light";
		StorageHelper.set(StorageKeys.Theme, initialTheme);
	}

	UnistylesRegistry.addBreakpoints(breakpoints)
		.addThemes({
			light: lightTheme,
			dark: darkTheme,
		})
		.addConfig({
			adaptiveThemes: true,
			initialTheme: initialTheme as keyof AppThemes,
		});
};
