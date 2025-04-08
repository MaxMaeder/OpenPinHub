import { Stack } from "@mantine/core";
import { InstallerRepo, Release } from "src/state/slices/installersSlice";

type ReleaseDetailsProps = {
  installer: InstallerRepo;
  release: Release;
};

const ReleaseDetails = ({ installer, release }: ReleaseDetailsProps) => {
  return <Stack></Stack>;
};

export default ReleaseDetails;
