import { useStore } from "zustand";
import { StoreApi, createStore } from "zustand/vanilla";
import { QueueStatus } from "@fal-ai/serverless-client";
import { ModelItemType } from "app/types";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

type ErrorState = {
	show: boolean;
	error: string;
};

type ErrorActions = {
	setError: (show: boolean, error: string) => void;
};

const initialState: ErrorState = {
	show: false,
	error: "",
};

export const errorStore = createStore<ErrorState & ErrorActions>((set) => ({
	...initialState,
	setError: (show, error) => set({ show, error }),
}));

export const useErrorStore = () => useStore(errorStore);
