import { Paper, Box, Title, Text, List, Button, Badge } from "@mantine/core";

import classes from "./Hero.module.css";

const Hero = () => (
  <Paper
    withBorder
    bd="3px solid white"
    p="xl"
    radius="xl"
    className={classes.paper}
  >
    <Box className={classes.flexContainer}>
      <Box className={classes.textContainer}>
        <Title mb="lg">The OpenPin Interposer</Title>
        <Text mb="lg">
          You'll need an interposer to install OpenPin on your AI Pin. This is
          the highest-quality one you can buy, made by the creator of OpenPin.
        </Text>
        <Text fw="bold">Features</Text>
        <List mb="xl">
          <List.Item>High-tolerance, extremely durable design</List.Item>
          <List.Item>USB C connector (not pictured)</List.Item>
          <List.Item>Premium braided cable included</List.Item>
        </List>
        <Button
          size="lg"
          component="a"
          href="https://buy.stripe.com/cN2eYQ66U5PO3DObII"
          target="_blank"
          className={classes.button}
        >
          Buy Now
        </Button>
      </Box>
      <Box className={classes.imageContainer}>
        <Box component="img" src="/interposer.png" className={classes.image} />
        <Badge
          color="white"
          c="black"
          radius="sm"
          size="lg"
          className={classes.badge}
        >
          V2.0
        </Badge>
      </Box>
    </Box>
  </Paper>
);

export default Hero;
