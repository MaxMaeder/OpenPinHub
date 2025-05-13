import { Text } from "@mantine/core";
import PageLayout from "src/layouts/PageLayout";
import { getInstallerRepoUrl } from "src/services/installer";
import { useParams } from "wouter";
import ReleaseDetails from "./ReleaseDetails";
import { useQueryInstaller } from "src/hooks/query/installer";
import ReleaseSelector from "./ReleaseSelector";
import { QueryStateHandler } from "src/components/QueryStateHandler";

type InstallerDetailsParams = {
  owner: string;
  repo: string;
};

const InstallerDetails = () => {
  const { owner, repo } = useParams<InstallerDetailsParams>();
  const repoUrl = getInstallerRepoUrl(owner, repo);

  const installerQuery = useQueryInstaller(repoUrl);

  const title = installerQuery.data?.name
    ? `${installerQuery.data.name} Installer`
    : "Installer";

  return (
    <PageLayout title={title} warnAdbDisconnected>
      <QueryStateHandler query={installerQuery}>
        {(installer) => (
          <ReleaseSelector
            releases={installer.releases}
            selection={(release) => (
              <ReleaseDetails installer={installer} release={release} />
            )}
            noSelection={<Text>Select a release</Text>}
          />
        )}
      </QueryStateHandler>
    </PageLayout>
  );
};

export default InstallerDetails;
