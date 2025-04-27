import { Paper, Title, Text, Button } from "@mantine/core";

import classes from "./Card.module.css";

interface CardProps {
  title: string;
  description: string;
  cta: string;
  href: string;
}

const Card = ({ title, description, cta, href }: CardProps) => (
  <Paper withBorder p="lg" radius="md" className={classes.card}>
    <Title order={3} mb="xs">
      {title}
    </Title>
    <Text size="sm" mb="lg">
      {description}
    </Text>
    <Button component="a" href={href} target="_blank">
      {cta}
    </Button>
  </Paper>
);

export default Card;
