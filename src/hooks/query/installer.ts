import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchInstallerFromRepoUrl } from "src/services/installer";
import { useSources } from "../state/sourceStore";

const QUERY_KEY = "installer";

export const useQueryInstallers = () => {
  const repoUrls = useSources();

  return useQueries({
    queries: repoUrls.map((url) => ({
      queryKey: [QUERY_KEY, url],
      queryFn: () => fetchInstallerFromRepoUrl(url),
    })),
  });
};

export const useQueryInstaller = (repoUrl: string) =>
  useQuery({
    queryKey: [QUERY_KEY, repoUrl],
    queryFn: () => fetchInstallerFromRepoUrl(repoUrl),
  });
