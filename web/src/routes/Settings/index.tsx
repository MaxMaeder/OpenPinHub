import { Button, Stack } from "@mantine/core";
import PageLayout from "src/layouts/PageLayout";
import SourcesForm from "./SourcesForm";
import PageSection from "../../components/PageSection";
import { clearPersistedSources } from "src/hooks/state/sourceStore";

const Settings = () => {
  const handleReset = async () => {
    clearPersistedSources();
    location.reload();
  };

  return (
    <PageLayout title="Settings">
      <Stack>
        <SourcesForm />
        <PageSection title="Reset">
          <Button onClick={handleReset}>Clear Local Data</Button>
        </PageSection>
      </Stack>
    </PageLayout>
  );
};

export default Settings;
