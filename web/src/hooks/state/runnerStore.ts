import { ActionProgress, ActionStage } from "src/services/action";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import merge from "lodash.merge";

interface RunnerState {
  actionName?: string;
  progress: ActionProgress;
  stages: ActionStage[];

  setActionName: (name: string) => void;
  updateProgress: (progress: Partial<ActionProgress>) => void;
  addStage: (stage: Omit<ActionStage, "progress">) => void;
  updateStage: (id: string, patch: DeepPartial<ActionStage>) => void;
  reset: () => void;
}

const initProgress: ActionProgress = {
  status: "idle",
};

export const useRunnerStore = create<RunnerState>()(
  immer((set) => ({
    name: undefined,
    progress: initProgress,
    stages: [],

    setActionName: (name) =>
      set((state) => {
        state.actionName = name;
      }),

    updateProgress: (progress) =>
      set((state) => {
        Object.assign(state.progress, progress);
      }),

    addStage: (stage) =>
      set((state) => {
        state.stages.push({
          ...stage,
          progress: initProgress,
        });
      }),

    updateStage: (id, patch) =>
      set((state) => {
        const stage = state.stages.find((s) => s.id === id);
        if (stage) {
          merge(stage, patch);
        }
      }),

    reset: () =>
      set((state) => {
        state.actionName = undefined;
        state.progress = initProgress;
        state.stages = [];
      }),
  }))
);

export const useRunnerActionName = () => {
  return useRunnerStore((state) => state.actionName);
};

export const useRunnerProgress = () => {
  return useRunnerStore((state) => state.progress);
};

export const useRunnerStages = () => {
  return useRunnerStore((state) => state.stages);
};

export const useRunnerActions = () => {
  const reset = useRunnerStore((s) => s.reset);
  return { reset };
};
