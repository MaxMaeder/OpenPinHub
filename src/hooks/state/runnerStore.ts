import { ActionStage, ActionStatus } from "src/services/action";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface RunnerState {
  status: ActionStatus;
  stages: ActionStage[];

  setStatus: (status: ActionStatus) => void;
  addStage: (stage: ActionStage) => void;
  updateStage: (id: string, patch: Partial<ActionStage>) => void;
  reset: () => void;
}

export const useRunnerStore = create<RunnerState>()(
  immer((set) => ({
    status: "idle",
    stages: [],

    setStatus: (status) =>
      set((state) => {
        state.status = status;
      }),

    addStage: (stage) =>
      set((state) => {
        state.stages.push({
          ...stage,
          timestamp: undefined,
        });
      }),

    updateStage: (id, patch) =>
      set((state) => {
        const stage = state.stages.find((s) => s.id === id);
        if (stage) {
          Object.assign(stage, patch);
        }
      }),

    reset: () =>
      set((state) => {
        state.status = "idle";
        state.stages = [];
      }),
  }))
);

export const useRunnerStatus = () => {
  return useRunnerStore((state) => state.status);
};

export const useRunnerStages = () => {
  return useRunnerStore((state) => state.stages);
};

export const useRunnerActions = () => {
  const reset = useRunnerStore((s) => s.reset);
  return { reset };
};
