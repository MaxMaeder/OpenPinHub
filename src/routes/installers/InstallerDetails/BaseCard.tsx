import { Box, Paper, Space, Stack, Text, Title } from "@mantine/core";
import { ReactNode } from "react";

type BaseCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

const BaseCard = ({ title, description, children }: BaseCardProps) => (
  <Paper p="md" withBorder miw={{ base: "100%", md: "300px" }}>
    <Stack>
      <Box>
        <Title order={3}>{title}</Title>
        <Text>{description}</Text>
      </Box>
      <Space />
      {children}
    </Stack>
  </Paper>
);

export default BaseCard;
