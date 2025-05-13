import { Anchor, Paper, Text } from "@mantine/core";

const Credit = () => (
  <Paper withBorder p="sm">
    <Text w="100%" ta="center">
      Made with love by{" "}
      <Anchor href="https://mmaeder.com" target="_blank">
        Max Maeder
      </Anchor>
    </Text>
  </Paper>
);

export default Credit;
