import PageLayout from "../../../layouts/PageLayout";
import {
  Stack,
  Title,
  Text,
  SimpleGrid,
  Card,
  Group,
  Image,
  List,
  Anchor,
} from "@mantine/core";
import { Link } from "wouter";
import classes from "./OpenPin.module.css";
import NavCard from "./NavCard";
import icon from "src/assets/icon.svg";

const OpenPin = () => (
  <PageLayout hideTitle>
    <Stack gap="xl">
      <Card shadow="sm" p="lg" mt="md" radius="md" bg="dark.4">
        <Stack>
          <Group>
            <Image src={icon} h="3rem" />
            <Title order={1}>OpenPin</Title>
          </Group>
          <Text>
            OpenPin is an open-source project which lets you use your Ai Pin
            after Humane bricked them. You can install it in a few clicks &
            without any ADB certs!
          </Text>
          <Text>
            You'll need an{" "}
            <Anchor component={Link} to="~/about/interposers">
              interposer
            </Anchor>{" "}
            to get started.
          </Text>
        </Stack>
      </Card>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
        <NavCard title="Setup" to="/installation" className={classes.card}>
          <Text>Step-by-step guide to install OpenPin on your Ai Pin.</Text>
        </NavCard>

        <NavCard
          title="Features"
          to="/features"
          className={`${classes.card} ${classes.featuresCard}`}
        >
          <List>
            <List.Item>
              <b>Assistant:</b> Voice commands for answers, navigation, weather,
              and web browsing
            </List.Item>
            <List.Item>
              <b>Visual Analysis:</b> Analyze images with AI
            </List.Item>
            <List.Item>
              <b>Translation:</b> Real-time language translation
            </List.Item>
            <List.Item>
              <b>Capture:</b> Take photos and 15-second videos
            </List.Item>
          </List>
          <Text>
            All content syncs with{" "}
            <Anchor href="https://openpin.center" target="_blank">
              OpenPin.Center
            </Anchor>{" "}
            for easy management.
          </Text>
        </NavCard>

        <NavCard title="Support" to="/support" className={classes.card}>
          <Text>Get help troubleshooting common issues.</Text>
        </NavCard>
      </SimpleGrid>
    </Stack>
  </PageLayout>
);

export default OpenPin;
