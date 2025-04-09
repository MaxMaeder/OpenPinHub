import { Button, Center, Stack, Title } from "@mantine/core";
import { Link } from "wouter";

const NotFound = () => (
  <Center flex={1}>
    <Stack align="center" gap="lg">
      <Stack align="center">
        <Title order={1}>Page Not Found</Title>
        <Button variant="default" component={Link} to="~/">
          Go Home
        </Button>
      </Stack>
    </Stack>
  </Center>
);

export default NotFound;
