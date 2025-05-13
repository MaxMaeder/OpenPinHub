import { Accordion, Box, Group, Paper, Text } from "@mantine/core";
import {
  useRunnerActionName,
  useRunnerProgress,
  useRunnerStages,
} from "src/hooks/state/runnerStore";
import classes from "./RunAction.module.css";
import ProgressIndicator from "./ProgressIndicator";
import { ActionProgress } from "src/services/action";

const getStatusDetails = (
  name: string | undefined,
  progress: ActionProgress
): string => {
  // This component shouldn't render in a way where status is 'idle' or 'name' unset
  switch (progress.status) {
    case "idle":
      return "Run";
    case "running":
      return `Running '${name}'...`;
    case "done":
      return `'${name}' successfully completed`;
    case "error":
      return `'${name}' failed to complete`;
  }
};

const ActionOutput = () => {
  const actionName = useRunnerActionName();
  const runnerProgress = useRunnerProgress();
  const runnerStages = useRunnerStages();

  const statusDetails = getStatusDetails(actionName, runnerProgress);

  if (runnerStages.length == 0) {
    return (
      <Paper p="md" withBorder w="100%" maw="1000px">
        <Text>Run the action to see output here.</Text>
      </Paper>
    );
  }

  return (
    <Accordion
      variant="contained"
      w="100%"
      maw="1000px"
      bg="var(--mantine-color-body)"
    >
      <Box className={classes.outputSummary}>
        <Group gap="md">
          <Box component="span" fw={700}>
            {statusDetails}
          </Box>
          <ProgressIndicator progress={runnerProgress} />
        </Group>
      </Box>
      {runnerStages.map((stage) => (
        <Accordion.Item key={stage.id} value={stage.id}>
          <Accordion.Control>
            <Group gap="md">
              <span>{stage.command}</span>
              <ProgressIndicator progress={stage.progress} />
            </Group>
          </Accordion.Control>

          <Accordion.Panel>
            {stage.progress.status == "idle" ? (
              <Text>Stage hasn't ran yet.</Text>
            ) : (
              <Paper
                component="pre"
                withBorder
                p="md"
                m={0}
                bg="black"
                ff="monospace"
              >
                {stage.output}
              </Paper>
            )}
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default ActionOutput;
