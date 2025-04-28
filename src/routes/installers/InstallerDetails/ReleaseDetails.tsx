import { Group, Space, Stack } from "@mantine/core";
import MdDoc from "src/components/MdDoc";
import {
  getReleaseAssetUrl,
  InstallerRelease,
  InstallerRepo,
} from "src/services/installer";
import ActionCard from "./ActionCard";
import PageSection from "src/components/PageSection";
import RebootCard from "./utilities/RebootCard";

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
        <Group w="100%">
          {release.manifest.actions.map((action) => (
            <ActionCard key={action.title} release={release} action={action} />
          ))}
        </Group>
      </PageSection>
      <PageSection title="Available Utilities">
        <Group w="100%">
          <RebootCard />
        </Group>
      </PageSection>
    </Stack>
  );
};

export default ReleaseDetails;
