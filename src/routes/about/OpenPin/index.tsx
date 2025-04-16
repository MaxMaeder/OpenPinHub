import Content from "./Content.mdx";
import PageLayout from "../../../layouts/PageLayout";
import { TypographyStylesProvider } from "@mantine/core";

const OpenPin = () => {
  return (
    <PageLayout title="OpenPin">
      <TypographyStylesProvider>
        <Content />
      </TypographyStylesProvider>
    </PageLayout>
  );
};

export default OpenPin;
