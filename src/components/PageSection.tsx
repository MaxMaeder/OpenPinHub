import { Stack } from "@mantine/core";
import { ReactNode } from "react";
import PageHeading from "src/components/PageHeading";

type PageSectionProps = {
  title: string;
  children: ReactNode;
};

const PageSection = ({ title, children }: PageSectionProps) => (
  <Stack align="start" gap="sm" w="100%">
    <PageHeading>{title}</PageHeading>
    {children}
  </Stack>
);

export default PageSection;
