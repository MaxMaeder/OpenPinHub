import { Stack, Title } from "@mantine/core";
import { ReactNode } from "react";

type SectionProps = {
  title: string;
  children: ReactNode;
};

const Section = ({ title, children }: SectionProps) => (
  <Stack align="start" gap="sm">
    <Title order={3} size="lg">
      {title}
    </Title>
    {children}
  </Stack>
);

export default Section;
