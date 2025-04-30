import PageLayout from "../../../layouts/PageLayout";
import { Button, Group, Stack, Title, Text, SimpleGrid, Card, Center } from "@mantine/core";
import { Link } from "wouter";

const OpenPin = () => {
  return (
    <PageLayout title="OpenPin">
      <Stack>
        <Text>
          OpenPin is an open-source project which lets you use your Ai Pin after Humane bricked them.
          You can install it in a few clicks & without any ADB certs!
        </Text>

        <SimpleGrid cols={{ base: 1, md: 2 }}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section p="md">
              <Center>
                <Title order={3}>Introduction</Title>
              </Center>
            </Card.Section>
            <Text size="sm" mb="md">
              Learn what OpenPin is and how it can help you use your Ai Pin.
            </Text>
            <Button component={Link} to="/introduction" variant="light" fullWidth>
              Read More
            </Button>
          </Card>

          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section p="md">
              <Center>
                <Title order={3}>Installation</Title>
              </Center>
            </Card.Section>
            <Text size="sm" mb="md">
              Step-by-step guide to install OpenPin on your Ai Pin device.
            </Text>
            <Button component={Link} to="/installation" variant="light" fullWidth>
              Read More
            </Button>
          </Card>

          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section p="md">
              <Center>
                <Title order={3}>Features</Title>
              </Center>
            </Card.Section>
            <Text size="sm" mb="md">
              Explore the features and capabilities of OpenPin.
            </Text>
            <Button component={Link} to="/features" variant="light" fullWidth>
              Read More
            </Button>
          </Card>

          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section p="md">
              <Center>
                <Title order={3}>Support</Title>
              </Center>
            </Card.Section>
            <Text size="sm" mb="md">
              Get help with common issues and learn how to troubleshoot.
            </Text>
            <Button component={Link} to="/support" variant="light" fullWidth>
              Read More
            </Button>
          </Card>
        </SimpleGrid>
      </Stack>
    </PageLayout>
  );
};

export default OpenPin;
