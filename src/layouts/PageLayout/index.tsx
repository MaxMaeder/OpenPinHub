import { Badge, Flex, Group, Title } from "@mantine/core";
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
    <Flex direction="column" flex={1}>
      <Group mb="md">
        <Title order={1} size="h2">
          {title}
        </Title>
        {warnAdbDisconnected && !isConn && (
          <Badge
            color="red"
            leftSection={<IconAlertTriangleFilled size={12} />}
          >
            Pin disconnected
          </Badge>
        )}
      </Group>

      {children}
    </Flex>
  );
};

export default PageLayout;
