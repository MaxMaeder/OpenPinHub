import { Button, Paper, Stack, Text, Title } from "@mantine/core";
import { useAdb } from "../../../context/AdbProvider";

const ConnDetails = () => {
  const { isSupported, connInfo, connect, disconnect } = useAdb();

  return (
    <Paper withBorder p="sm">
      <Stack gap={0}>
        <Title order={2} size="lg">
          Connect Pin
        </Title>

        {isSupported ? (
          <>
            <Text>Unsupported, use Google Chrome.</Text>
            <Button mt="md" disabled>
              Browser Unsupported
            </Button>
          </>
        ) : connInfo ? (
          <>
            <Text>
              Device name: {connInfo.productName}, model:{" "}
              {connInfo.productModel}
            </Text>
            <Button mt="md" onClick={disconnect} color="gray">
              Disconnect
            </Button>
          </>
        ) : (
          <>
            <Text>No device connected.</Text>
            <Button mt="md" onClick={connect}>
              Connect
            </Button>
          </>
        )}
      </Stack>
    </Paper>
  );
};

export default ConnDetails;
