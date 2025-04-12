import { Group, Loader, Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { ActionProgress } from "src/services/action";

interface ProgressIndicatorProps {
  progress: ActionProgress;
}

const ProgressIndicator = ({ progress }: ProgressIndicatorProps) => {
  const { status, startTime, endTime } = progress;
  const [elapsedSeconds, setElapsedSeconds] = useState<number | null>(null);

  useEffect(() => {
    if (status === "running" && startTime) {
      const interval = setInterval(() => {
        setElapsedSeconds(
          Math.floor((Date.now() - startTime.getTime()) / 1000)
        );
      }, 1000);

      return () => clearInterval(interval);
    }

    if ((status === "done" || status === "error") && startTime && endTime) {
      const seconds = Math.floor(
        (endTime.getTime() - startTime.getTime()) / 1000
      );
      setElapsedSeconds(seconds);
    }

    if (status === "idle") {
      setElapsedSeconds(null);
    }
  }, [status, startTime, endTime]);

  if (status === "idle") return null;

  return (
    <Group gap="xs">
      {status === "running" && <Loader size={20} color="white" />}
      {status === "done" && <IconCheck size={20} color="green" />}
      {status === "error" && <IconX size={20} color="red" />}
      {elapsedSeconds !== null && (
        <Text size="sm" c="dimmed">
          {elapsedSeconds}s
        </Text>
      )}
    </Group>
  );
};

export default ProgressIndicator;
