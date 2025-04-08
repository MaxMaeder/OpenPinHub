import { Box, Button, Paper, Space, Stack, Text, Title } from "@mantine/core";
import { InstallerAction, InstallerRelease } from "src/services/installer";

type ActionCardProps = {
  release: InstallerRelease;
  action: InstallerAction;
};

const ActionCard = ({ action }: ActionCardProps) => {
  return (
    <Paper p="md" withBorder miw="300px">
      <Stack>
        <Box>
          <Title order={3}>{action.title}</Title>
          <Text>{action.description}</Text>
        </Box>
        <Space />
        <Button>Run Action</Button>
      </Stack>
    </Paper>
  );
};

export default ActionCard;
