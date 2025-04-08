import { Group, Space, Stack } from "@mantine/core";
import MdDoc from "src/components/MdDoc";
import {
  getInstallerAssetUrl,
  InstallerRelease,
  InstallerRepo,
} from "src/services/installer";
import ActionCard from "./ActionCard";
import PageSection from "src/components/PageSection";

type ReleaseDetailsProps = {
  installer: InstallerRepo;
  release: InstallerRelease;
};

const ReleaseDetails = ({ release }: ReleaseDetailsProps) => {
  const installerDoc = getInstallerAssetUrl(release, release.installer.doc);

  return (
    <Stack w="100%">
      <Space />
      {installerDoc && (
        <>
          <PageSection title="Release Instructions">
            <MdDoc assetUrl={installerDoc} w="100%" maw="1000px" />
          </PageSection>
        </>
      )}
      <PageSection title="Available Actions">
        <Group>
          {release.installer.actions.map((action) => (
            <ActionCard release={release} action={action} />
          ))}
        </Group>
      </PageSection>
    </Stack>
  );
};

export default ReleaseDetails;
