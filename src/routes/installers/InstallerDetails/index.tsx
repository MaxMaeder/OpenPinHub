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

  const releaseOptions = useMemo(() => {
    if (installer?.releases.length == 0) {
      return [];
    }

    return installer.releases.map((r) => ({
      value: r.id.toString(),
      label: r.name,
    }));
  }, [installer]);
  const [selectedRelease, setSelectedRelease] = useState(
    installer?.releases[0]?.id.toString()
  );

  if (!installer) return <></>;

  return (
    <PageLayout title={`Install ${installer.name}`} warnAdbDisconnected>
      <Stack align="start">
        <Select
          data={releaseOptions}
          value={selectedRelease}
          onChange={setSelectedRelease}
        />
      </Stack>
      <p>{JSON.stringify(installer)}</p>
    </PageLayout>
  );
};

export default InstallerDetails;
