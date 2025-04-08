import { useQuery } from "@tanstack/react-query";
import { fetchGithubAsset } from "src/api/githubProxy";

const QUERY_KEY = "asset";

export const useQueryAsset = (assetUrl: string) =>
  useQuery({
    queryKey: [QUERY_KEY, assetUrl],
    queryFn: () => fetchGithubAsset(assetUrl),
  });
