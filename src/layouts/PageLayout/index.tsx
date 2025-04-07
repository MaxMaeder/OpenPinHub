import { Stack, Title } from "@mantine/core";
import { ReactNode } from "react";

type PageLayoutProps = {
  title: string;
  children: ReactNode;
};

const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <Stack gap="md">
      <Title order={1} size="h2">
        {title}
      </Title>
      {children}
    </Stack>
  );
};

export default PageLayout;
