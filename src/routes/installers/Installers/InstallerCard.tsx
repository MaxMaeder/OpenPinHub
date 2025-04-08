import { Box, Button, Group, Paper, Text, Title } from "@mantine/core";
import { UseQueryResult } from "@tanstack/react-query";
import { QueryStateHandler } from "src/components/QueryStateHandler";
import { InstallerRepo, InstallerRelease } from "src/services/installer";
import { Link } from "wouter";

type InstallerCardProps = {
  installerQuery: UseQueryResult<InstallerRepo, Error>;
};

const getReleasesText = (releases: InstallerRelease[]) =>
  releases.length == 1 ? "1 release" : `${releases.length} releases`;

const InstallerCard = ({ installerQuery }: InstallerCardProps) => (
  <Paper withBorder p="md">
    <Group justify="space-between" align="center" h="100%">
      <QueryStateHandler query={installerQuery}>
        {(installer) => (
          <>
            <Box h="100%">
              <Title order={3}>{installer.name}</Title>
              <Text>{installer.description}</Text>
              <Text>{getReleasesText(installer.releases)}</Text>
            </Box>
            <Button component={Link} to={`/${installer.id}`}>
              Use
            </Button>
          </>
        )}
      </QueryStateHandler>
    </Group>
  </Paper>
);

export default InstallerCard;
