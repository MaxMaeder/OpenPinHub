import { Select, Stack } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import PageLayout from "src/layouts/PageLayout";
import { getInstallerRepoUrl } from "src/services/installer";
import { useAppDispatch, useAppSelector } from "src/state/hooks";
import {
  fetchInstaller,
  selectInstallerByParts,
} from "src/state/slices/installersSlice";
import { useParams } from "wouter";
import ReleaseDetails from "./ReleaseDetails";
import { IconTag } from "@tabler/icons-react";

type InstallerDetailsParams = {
  owner: string;
  repo: string;
};

const InstallerDetails = () => {
  const dispatch = useAppDispatch();

  const { owner, repo } = useParams<InstallerDetailsParams>();
  const repoUrl = getInstallerRepoUrl(owner, repo);

  useEffect(() => {
    if (!repoUrl) return;
    dispatch(fetchInstaller(repoUrl));
  }, [repoUrl]);

  const installer = useAppSelector((state) =>
    selectInstallerByParts(state, owner, repo)
  );

  const [selectedRelease, setSelectedRelease] = useState<string | null>(null);
  const releaseOptions = useMemo(() => {
    if (!installer || !installer.releases[0]) {
      return [];
    }

    if (!selectedRelease) {
      setSelectedRelease(installer.releases[0].id.toString());
    }

    return installer.releases.map((r) => ({
      value: r.id.toString(),
      label: r.name,
    }));
  }, [installer]);

  const release = useMemo(
    () => installer?.releases.find((r) => r.id.toString() == selectedRelease),
    [installer, selectedRelease]
  );

  if (!installer) return <></>;

  return (
    <PageLayout title={`Install ${installer.name}`} warnAdbDisconnected>
      <Stack align="start">
        <Select
          data={releaseOptions}
          value={selectedRelease}
          onChange={setSelectedRelease}
          leftSection={<IconTag size={16} />}
        />
        {installer && release && (
          <ReleaseDetails installer={installer} release={release} />
        )}
      </Stack>
      <p>{JSON.stringify(installer)}</p>
    </PageLayout>
  );
};

export default InstallerDetails;
