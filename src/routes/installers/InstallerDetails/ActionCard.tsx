import { Box, Button, Paper, Space, Stack, Text, Title } from "@mantine/core";
import { InstallerAction, InstallerRelease } from "src/services/installer";
import { Link } from "wouter";

type ActionCardProps = {
  release: InstallerRelease;
  action: InstallerAction;
};

const ActionCard = ({ release, action }: ActionCardProps) => {
  const actionSlug = action.title.toLowerCase().replace(" ", "-");

  return (
    <Paper p="md" withBorder miw="300px">
      <Stack>
        <Box>
          <Title order={3}>{action.title}</Title>
          <Text>{action.description}</Text>
        </Box>
        <Space />
        <Button component={Link} to={`/${release.id}/${actionSlug}`}>
          Run Action
        </Button>
      </Stack>
    </Paper>
  );
};

export default ActionCard;
