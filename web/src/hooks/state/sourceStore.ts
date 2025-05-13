import { DEFAULT_SOURCE_LIST } from "src/config/sourceConfig";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface SourcesState {
  sources: string[];

  setSources: (urls: string[]) => void;

  selectAllSources: () => string[];
}

export const useSourcesStore = create<SourcesState>()(
  persist(
    immer((set, get) => ({
      sources: DEFAULT_SOURCE_LIST,

      setSources: (urls) => {
        set((state) => {
          state.sources = urls;
        });
      },

      selectAllSources: () => get().sources,
    })),
    {
      name: "sources-storage",
    }
  )
);

export const clearPersistedSources = () =>
  useSourcesStore.persist.clearStorage();

export const useSources = () => {
  return useSourcesStore((state) => state.sources);
};

export const useSourcesActions = () => {
  const setSources = useSourcesStore((s) => s.setSources);
  return { setSources };
};
