import { UseQueryResult } from "@tanstack/react-query";
import { QueryStateHandler } from "src/components/QueryStateHandler";
import { useQueryInstaller } from "src/hooks/query/installer";
import PageLayout from "src/layouts/PageLayout";
import {
  getActionFromSlug,
  getInstallerRepoUrl,
  getReleaseById,
  InstallerAction,
  InstallerRelease,
  InstallerRepo,
} from "src/services/installer";
import { useLocation, useParams } from "wouter";
import ActionDetails from "./ActionDetails";

type RunActionsParams = {
  owner: string;
  repo: string;
  release: number;
  action: string;
};

const getAction = (
  query: UseQueryResult<InstallerRepo, Error>,
  releaseId: number,
  actionSlug: string
): { release: InstallerRelease; details: InstallerAction } | undefined => {
  if (!query.data) return;
  const { data: installer } = query;

  const release = getReleaseById(installer, releaseId);
  if (!release) return;
  const action = getActionFromSlug(release, actionSlug);
  if (!action) return;

  return { release, details: action };
};

const RunAction = () => {
  const [_, navigate] = useLocation();

  const {
    owner,
    repo,
    release: releaseId,
    action: actionSlug,
  } = useParams<RunActionsParams>();
  const repoUrl = getInstallerRepoUrl(owner, repo);

  const installerQuery = useQueryInstaller(repoUrl);

  const action = getAction(installerQuery, releaseId, actionSlug);
  if (installerQuery.data && !action) {
    // Installer fetched and action not found
    navigate("~/404");
    return;
  }

  const title = action?.details.title
    ? `Run ${action.details.title} Action`
    : "Run Action";

  return (
    <PageLayout title={title} warnAdbDisconnected>
      <QueryStateHandler query={installerQuery}>
        {(_) => (
          <ActionDetails release={action!.release} action={action!.details} />
        )}
      </QueryStateHandler>
    </PageLayout>
  );
};

export default RunAction;
