import Content from "./Content.mdx";
import PageLayout from "../../../../layouts/PageLayout";
import { TypographyStylesProvider } from "@mantine/core";

const Features = () => {
  return (
    <PageLayout title="OpenPin Features">
      <TypographyStylesProvider>
        <Content />
      </TypographyStylesProvider>
    </PageLayout>
  );
};

export default Features;