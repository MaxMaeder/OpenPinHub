import Content from "./Content.mdx";
import PageLayout from "../../../../layouts/PageLayout";
import { TypographyStylesProvider } from "@mantine/core";

const Support = () => {
  return (
    <PageLayout title="OpenPin Support">
      <TypographyStylesProvider>
        <Content />
      </TypographyStylesProvider>
    </PageLayout>
  );
};

export default Support;