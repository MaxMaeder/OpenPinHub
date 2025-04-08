import { Box, Button, Group, Paper, Text, Title } from "@mantine/core";
import { InstallerRepo, Release } from "src/state/slices/installersSlice";
import { Link } from "wouter";

type InstallerCardProps = {
  installer: InstallerRepo;
};

const getReleasesText = (releases: Release[]) =>
  releases.length == 1 ? "1 release" : `${releases.length} releases`;

const InstallerCard = ({ installer }: InstallerCardProps) => (
  <Paper withBorder p="md">
    <Group justify="space-between" align="center" h="100%">
      <Box h="100%">
        <Title order={3}>{installer.name}</Title>
        <Text>{installer.description}</Text>
        <Text>{getReleasesText(installer.releases)}</Text>
      </Box>
      <Button component={Link} to={`/${installer.id}`}>
        Use
      </Button>
    </Group>
  </Paper>
);

export default InstallerCard;
