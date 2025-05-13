import { Card, Stack, Title, Group, Button } from "@mantine/core";
import { Link } from "wouter";
import { IconArrowRight } from "@tabler/icons-react";
import { ReactNode } from "react";

interface NavCardProps {
  title: string;
  to: string;
  className?: string;
  children: ReactNode;
}

const NavCard = ({ title, to, className, children }: NavCardProps) => (
  <Card shadow="sm" p="lg" radius="md" withBorder className={className}>
    <Stack h="100%">
      <Title order={3}>{title}</Title>
      <Stack mb="md" flex={1}>
        {children}
      </Stack>
      <Group justify="end">
        <Button
          component={Link}
          to={to}
          variant="transparent"
          rightSection={<IconArrowRight size={14} />}
        >
          Read More
        </Button>
      </Group>
    </Stack>
  </Card>
);

export default NavCard;
