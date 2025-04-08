import { Button, Stack } from "@mantine/core";
import PageLayout from "src/layouts/PageLayout";
import SourcesForm from "./SourcesForm";
import Section from "./Section";
import { persistor } from "src/state/store";

const Settings = () => {
  const handleReset = async () => {
    await persistor.purge();
    location.reload();
  };

  return (
    <PageLayout title="Settings">
      <Stack>
        <SourcesForm />
        <Section title="Reset">
          <Button onClick={handleReset}>Clear Local Data</Button>
        </Section>
      </Stack>
    </PageLayout>
  );
};

export default Settings;
