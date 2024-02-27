import { create } from "zustand";
import { QueueStatus } from "@fal-ai/serverless-client";
import { FalOutputResponse, ModelItemType } from "app/types";

type ProcessState = {
	model: ModelItemType | null;
	inputs: Record<string, any>;
	processing: boolean;
	queueStatus: QueueStatus | null;
	showResult: boolean;
	result: FalOutputResponse | null;
};

type ProcessActions = {
	setModel: (model: ModelItemType | null) => void;
	registerInput: (name: string, value: any) => void;
	setProcessing: (processing: boolean) => void;
	setQueueStatus: (status: QueueStatus) => void;
	setShowResult: (
		showResult: boolean,
		result: FalOutputResponse | null
	) => void;
	// setQueueStatus: (status: QueueStatus) => void;
	reset: (intialValues?: Partial<ProcessState>) => void;
};

const initialState: ProcessState = {
	model: null,
	processing: false,
	showResult: false,
	result: null,
	queueStatus: null,
	inputs: {},
};

export const useProcessStore = create<ProcessState & ProcessActions>((set) => ({
	...initialState,
	setModel: (model: ModelItemType | null) => set({ model }),
	setProcessing: (isProcessing: boolean) => set({ processing: isProcessing }),
	setQueueStatus: (status: QueueStatus) => set({ queueStatus: status }),
	setShowResult: (showResult: boolean, result: FalOutputResponse | null) =>
		set({ showResult, result }),
	registerInput: (name: string, value: any) =>
		set((state) => ({ inputs: { ...state.inputs, [name]: value } })),
	reset: (initialValues?: Partial<ProcessState>) =>
		set({ ...initialState, ...initialValues }),
}));
