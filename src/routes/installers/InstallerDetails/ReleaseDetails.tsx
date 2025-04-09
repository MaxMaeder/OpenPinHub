import { Group, Space, Stack } from "@mantine/core";
import MdDoc from "src/components/MdDoc";
import {
  getReleaseAssetUrl,
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
  const releaseDoc = getReleaseAssetUrl(release, release.manifest.doc);

  return (
    <Stack w="100%">
      <Space />
      {releaseDoc && (
        <>
          <PageSection title="Release Instructions">
            <MdDoc assetUrl={releaseDoc} w="100%" maw="1000px" />
          </PageSection>
        </>
      )}
      <PageSection title="Available Actions">
        <Group>
          {release.manifest.actions.map((action) => (
            <ActionCard release={release} action={action} />
          ))}
        </Group>
      </PageSection>
    </Stack>
  );
};

export default ReleaseDetails;
