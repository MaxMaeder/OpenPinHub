import Content from "./Content.mdx";
import PageLayout from "../../../../layouts/PageLayout";
import { TypographyStylesProvider } from "@mantine/core";

const Introduction = () => {
  return (
    <PageLayout title="Introduction to OpenPin">
      <TypographyStylesProvider>
        <Content />
      </TypographyStylesProvider>
    </PageLayout>
  );
};

export default Introduction;