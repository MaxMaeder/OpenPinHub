import { Badge, Group, Stack, Title } from "@mantine/core";
import { IconAlertTriangleFilled } from "@tabler/icons-react";
import { ReactNode } from "react";
import { useAdb } from "../../context/AdbProvider";

type PageLayoutProps = {
  title: string;
  warnAdbDisconnected?: boolean;
  children: ReactNode;
};

const PageLayout = ({
  title,
  warnAdbDisconnected,
  children,
}: PageLayoutProps) => {
  const { connInfo } = useAdb();
  const isConn = connInfo != null;

  return (
    <Stack gap="md">
      <Group>
        <Title order={1} size="h2">
          {title}
        </Title>
        {warnAdbDisconnected && !isConn && (
          <Badge
            color="red"
            leftSection={<IconAlertTriangleFilled size={12} />}
          >
            Device disconnected
          </Badge>
        )}
      </Group>

      {children}
    </Stack>
  );
};

export default PageLayout;
