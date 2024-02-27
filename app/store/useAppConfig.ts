import { MMKVPromisifiedStorage, StorageHelper } from "app/utils";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AppConfigState = {
	initialized: boolean;
	isOnBoarded: boolean;
};
type AppConfigActions = {
	setOnBoarded: (value: boolean) => void;
	setInitialized: (value: boolean) => void;
};

const initialState: AppConfigState = {
	initialized: false,
	isOnBoarded: false,
};

export const useAppConfigStore = create(
	persist<AppConfigState & AppConfigActions>(
		(set, get) => ({
			...initialState,
			setInitialized: (value: boolean) => set({ initialized: value }),
			setOnBoarded: (value: boolean) => set({ isOnBoarded: value }),
		}),
		{
			name: "appConfig",
			storage: createJSONStorage(() => MMKVPromisifiedStorage),
		}
	)
);
