import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { selectAllSources } from "./sourcesSlice";
import { fetchInstallerFromRepoUrl } from "src/services/installer";

export interface InstallerAction {
  title: string;
  description: string;
  doc: string;
  script: string;
}
export interface InstallerManifest {
  doc: string;
  actions: InstallerAction[];
}
export interface Release {
  id: number;
  name: string;
  date: string;
  installer: InstallerManifest;
}
export interface InstallerRepo {
  id: string;
  name: string;
  description: string;
  releases: Release[];
}

const installersAdapter = createEntityAdapter<InstallerRepo, string>({
  selectId: (repo) => repo.id,
});

/**
 * Fetch installer data for a single repository.
 * This thunk takes a GitHub URL as its parameter.
 */
export const fetchInstaller = createAsyncThunk<
  InstallerRepo,
  string,
  { rejectValue: string }
>("installers/fetchInstaller", async (githubUrl, thunkAPI) => {
  try {
    const data = await fetchInstallerFromRepoUrl(githubUrl);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.message || `Failed to fetch installer for ${githubUrl}`
    );
  }
});

/**
 * Fetch installer repositories in bulk.
 * This thunk retrieves the list of URLs from the state and dispatches
 * fetchInstaller for each one.
 */
export const fetchInstallers = createAsyncThunk<
  InstallerRepo[],
  void,
  { state: RootState; rejectValue: string }
>("installers/fetchInstallers", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const installerUrls = selectAllSources(state).map((source) => source.url);

  // Dispatch fetchInstaller for each URL and wait for all to finish.
  const results = await Promise.all(
    installerUrls.map((url) => thunkAPI.dispatch(fetchInstaller(url)).unwrap())
  );

  if (results.length === 0) {
    return thunkAPI.rejectWithValue("Failed to fetch any installers.");
  }

  return results;
});

const installersSlice = createSlice({
  name: "installers",
  initialState: installersAdapter.getInitialState({
    loading: false,
    error: null as string | null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Bulk fetch.
      .addCase(fetchInstallers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstallers.fulfilled, (state, action) => {
        state.loading = false;
        installersAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchInstallers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // TODO: errors for this
      // Handle individual installer fetch.
      .addCase(fetchInstaller.fulfilled, (state, action) => {
        installersAdapter.upsertOne(state, action.payload);
      });
  },
});

// Todo: these really should return InstallerRepo | undefined but they don't
export const { selectAll: selectInstallers, selectById: selectInstallerById } =
  installersAdapter.getSelectors((state: RootState) => state.installers);

export const selectInstallerByParts = (
  state: RootState,
  owner: string,
  repo: string
) => selectInstallerById(state, `${owner}/${repo}`);

export default installersSlice.reducer;
