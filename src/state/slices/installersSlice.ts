import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { Octokit } from "@octokit/rest";
import { RootState } from "../store";
import { selectAllSources } from "./sourcesSlice";

export interface Release {
  name: string;
  artifacts: string[];
}

export interface InstallerData {
  id: string;
  name: string;
  description: string;
  releases: Release[];
}

const installersAdapter = createEntityAdapter<InstallerData, string>({
  selectId: (installer) => installer.id,
});

export const fetchInstallers = createAsyncThunk<
  InstallerData[],
  void,
  { state: RootState; rejectValue: string }
>("installers/fetchInstallers", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  // Get installer URLs from the sources slice.
  const installerUrls = selectAllSources(state).map((source) => source.url);

  const octokit = new Octokit();

  // Map each URL to a promise that fetches its installer data.
  const installerDataPromises = installerUrls.map(async (url) => {
    // Extract owner and repo using a regex.
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      throw new Error(`Invalid GitHub repo URL: ${url}`);
    }
    const owner = match[1];
    const repo = match[2];

    // Fetch repo details and releases.
    const { data: repoDetails } = await octokit.repos.get({ owner, repo });
    const { data: releases } = await octokit.repos.listReleases({
      owner,
      repo,
    });

    // Format releases.
    const formattedReleases: Release[] = releases.map((release) => ({
      name: release.name || release.tag_name,
      artifacts: release.assets.map((asset) => asset.name),
    }));

    return {
      id: repoDetails.full_name, // e.g. "owner/repo"
      name: repoDetails.name,
      description: repoDetails.description || "",
      releases: formattedReleases,
    } as InstallerData;
  });

  // Wait for all promises to settle.
  const results = await Promise.allSettled(installerDataPromises);

  // Filter out only the fulfilled promises.
  const installers: InstallerData[] = results
    .filter(
      (result): result is PromiseFulfilledResult<InstallerData> =>
        result.status === "fulfilled"
    )
    .map((result) => result.value);

  if (installers.length === 0) {
    return thunkAPI.rejectWithValue("Failed to fetch any installers.");
  }

  return installers;
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
      });
  },
});

export const { selectAll: selectInstallers } = installersAdapter.getSelectors(
  (state: RootState) => state.installers
);

export const selectInstallerUrls = createSelector(
  selectInstallers,
  (installers) =>
    installers.map((installer) => `https://github.com/${installer.id}`)
);

export default installersSlice.reducer;
