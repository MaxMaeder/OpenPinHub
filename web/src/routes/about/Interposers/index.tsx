import { Box, Stack, Title } from "@mantine/core";
import PageLayout from "src/layouts/PageLayout";

import classes from "./Interposers.module.css";
import Hero from "./Hero";
import Card from "./Card";

const Interposers = () => {
  return (
    <PageLayout hideTitle>
      <Stack className={classes.stack}>
        <Hero />

        <Title
          order={2}
          w="100%"
          ta="center"
          mt="lg"
          mb="sm"
          size="xl"
          fs="italic"
        >
          Other options
        </Title>

        <Box className={classes.cardsContainer}>
          <Card
            title="Build Your Own"
            description="The designs for the OpenPin interposer are fully open-source."
            cta="Build One"
            href="https://github.com/MaxMaeder/OpenPin?tab=readme-ov-file#building-a-interposer"
          />
          <Card
            title="DarkMoonLabs Interposer"
            description="DarkMoonLabs also sells an interposer on Etsy."
            cta="Buy Now"
            href="https://www.etsy.com/listing/1904242117"
          />
        </Box>
      </Stack>
    </PageLayout>
  );
};

export default Interposers;
