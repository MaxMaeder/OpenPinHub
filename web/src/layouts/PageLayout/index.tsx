import { Badge, Flex, Group, Title } from "@mantine/core";
import { IconAlertTriangleFilled } from "@tabler/icons-react";
import { ReactNode } from "react";
import { useAdb } from "../../context/AdbProvider";

interface BaseProps {
  warnAdbDisconnected?: boolean;
  children: ReactNode;
}

interface NoTitleProps extends BaseProps {
  hideTitle: true;
  title?: string;
}

interface WithTitleProps extends BaseProps {
  hideTitle?: false;
  title: string;
}

type PageLayoutProps = NoTitleProps | WithTitleProps;

const PageLayout = ({
  title,
  hideTitle,
  warnAdbDisconnected,
  children,
}: PageLayoutProps) => {
  const { connInfo } = useAdb();
  const isConn = connInfo != null;

  return (
    <Flex direction="column" flex={1}>
      {!hideTitle && (
        <Group mb="md" align="center">
          {title && <Title order={1}>{title}</Title>}
          {warnAdbDisconnected && !isConn && (
            <Badge
              color="red"
              leftSection={<IconAlertTriangleFilled size={12} />}
              mt="5px"
            >
              Pin disconnected
            </Badge>
          )}
        </Group>
      )}

      {children}
    </Flex>
  );
};

export default PageLayout;
