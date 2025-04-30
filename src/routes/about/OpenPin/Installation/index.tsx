import Content from "./Content.mdx";
import PageLayout from "../../../../layouts/PageLayout";
import { TypographyStylesProvider } from "@mantine/core";

const Installation = () => {
  return (
    <PageLayout title="Installing OpenPin">
      <TypographyStylesProvider>
        <Content />
      </TypographyStylesProvider>
    </PageLayout>
  );
};

export default Installation;