import { Paper, Text, Title } from "@mantine/core";
import { InstallerData } from "src/state/slices/installersSlice";

type InstallerCardProps = {
  installer: InstallerData;
};

const InstallerCard = ({ installer }: InstallerCardProps) => (
  <Paper withBorder p="md">
    <Title order={3}>{installer.name}</Title>
    <Text>{installer.description}</Text>
    <Text>{installer.releases.length} releases</Text>
  </Paper>
);

export default InstallerCard;
