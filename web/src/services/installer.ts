import { Octokit } from "@octokit/rest";
import { fetchGithubAsset } from "src/api/githubProxy";
import { INSTALLER_MANIFEST_NAME } from "src/config/installerConfig";
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
export interface InstallerRelease {
  id: number;
  name: string;
  date: string;
  manifest: InstallerManifest;
  assets: Record<string, string>;
}
export interface InstallerRepo {
  id: string;
  name: string;
  description: string;
  releases: InstallerRelease[];
}

export const getInstallerRepoUrl = (owner: string, repo: string) =>
  `https://github.com/${owner}/${repo}/`;

export const getReleaseById = (installer: InstallerRepo, id: number) =>
  installer.releases.find((release) => release.id == id);
export const getReleaseAssetUrl = (release: InstallerRelease, name: string) => {
  return release.assets[name];
};

export const getActionSlug = (action: InstallerAction) =>
  action.title.toLowerCase().replace(" ", "-");
export const getActionFromSlug = (release: InstallerRelease, slug: string) =>
  release.manifest.actions.find((action) => getActionSlug(action) == slug);

// Helper function to extract owner and repo from a GitHub URL.
const parseGithubUrl = (githubUrl: string) => {
  const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match || !match[1] || !match[2]) {
    throw new Error(`Invalid GitHub repo URL: ${githubUrl}`);
  }
  return { owner: match[1], repo: match[2] };
};

/**
 * Fetches installer data for a single repository given its GitHub URL.
 *
 * For each release in the repository, it checks for an asset named "installer-info.json".
 * If the file exists, its content is fetched and parsed into an InstallerManifest.
 * Releases without the file are skipped.
 */
export const fetchInstallerFromRepoUrl = async (
  githubUrl: string
): Promise<InstallerRepo> => {
  const { owner, repo } = parseGithubUrl(githubUrl);
  const octokit = new Octokit();

  // Fetch repository details.
  const { data: repoDetails } = await octokit.repos.get({ owner, repo });

  // List releases for the repository.
  const { data: releases } = await octokit.repos.listReleases({ owner, repo });
  // console.log(releases);

  const validReleases: InstallerRelease[] = [];

  // Process each release.
  for (const release of releases) {
    // Look for the installer manifest file in this release’s assets.
    const installerAsset = release.assets.find(
      (asset) => asset.name === INSTALLER_MANIFEST_NAME
    );

    // Skip this release if the manifest file is not available.
    if (!installerAsset || !installerAsset.browser_download_url) {
      continue;
    }

    // Create an object mapping each asset name to its download URL.
    const assetsMapping = release.assets.reduce<Record<string, string>>(
      (acc, asset) => {
        if (asset.browser_download_url) {
          acc[asset.name] = asset.browser_download_url;
        }
        return acc;
      },
      {}
    );

    try {
      // Fetch the manifest file from its download URL.
      const manifest: InstallerManifest = await fetchGithubAsset(
        installerAsset.browser_download_url,
        "json"
      );

      validReleases.push({
        id: release.id,
        name: release.name || release.tag_name,
        date: release.created_at,
        manifest: manifest,
        assets: assetsMapping,
      });
    } catch (error) {
      // Log errors and skip the release on failure to parse.
      console.error(
        `Failed to fetch or parse installer manifest for release ${release.name}:`,
        error
      );
      continue;
    }
  }

  return {
    id: repoDetails.full_name, // e.g. "owner/repo"
    name: repoDetails.name,
    description: repoDetails.description || "",
    releases: validReleases,
  };
};
