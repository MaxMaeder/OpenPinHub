import { Accordion, Paper, Text } from "@mantine/core";
import { useRunnerStages } from "src/hooks/state/runnerStore";

const ActionOutput = () => {
  const runnerStages = useRunnerStages();
  // const theme = useMantineTheme();
  // console.log(theme);

  if (runnerStages.length == 0) {
    return (
      <Paper p="md" withBorder w="100%" maw="1000px">
        <Text>Run the action to see output here.</Text>
      </Paper>
    );
  }

  // TODO: make look better
  return (
    <Accordion variant="contained" w="100%" maw="1000px" bg="">
      {runnerStages.map((stage) => (
        <Accordion.Item key={stage.id} value={stage.id}>
          <Accordion.Control>{stage.command}</Accordion.Control>
          <Accordion.Panel>{stage.output}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default ActionOutput;
