import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DEFAULT_SOURCE_LIST } from "src/config/sourceConfig";

export interface Source {
  id: string; // Use the URL as the unique ID (or another unique identifier)
  url: string;
}

const defaultSources: Source[] = DEFAULT_SOURCE_LIST.map((url) => ({
  id: url,
  url,
}));

const sourcesAdapter = createEntityAdapter<Source, string>({
  selectId: (source) => source.id,
});

const initialState = sourcesAdapter.getInitialState({
  ids: defaultSources.map((source) => source.id),
  entities: defaultSources.reduce((acc, source) => {
    acc[source.id] = source;
    return acc;
  }, {} as Record<string, Source>),
});

const sourcesSlice = createSlice({
  name: "sources",
  initialState: initialState,
  reducers: {
    addSource: sourcesAdapter.addOne,
    setSources: sourcesAdapter.setAll,
    removeSource: sourcesAdapter.removeOne,
  },
});

export const { addSource, setSources, removeSource } = sourcesSlice.actions;

export const selectAllSources = sourcesAdapter.getSelectors(
  (state: RootState) => state.sources
).selectAll;

export default sourcesSlice.reducer;
