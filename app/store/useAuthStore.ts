import { useStore } from "zustand";
import { StoreApi, createStore } from "zustand/vanilla";
import { QueueStatus } from "@fal-ai/serverless-client";
import { ModelItemType } from "app/types";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

type ProcessState = {
	token: string | null;
	user: FirebaseAuthTypes.User | null;
};

type ProcessActions = {
	setToken: (token: string | null) => void;
	setUser: (user: FirebaseAuthTypes.User | null) => void;
};

const initialState: ProcessState = {
	token: null,
	user: null,
};

export const authStore = createStore<ProcessState & ProcessActions>((set) => ({
	...initialState,
	setToken: (token: string | null) => set({ token }),
	setUser: (user: FirebaseAuthTypes.User | null) => set({ user }),
}));

export const useAuthStore = () => useStore(authStore);
