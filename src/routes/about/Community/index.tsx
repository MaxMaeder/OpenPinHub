import Content from "./Content.mdx";
import PageLayout from "../../../layouts/PageLayout";
import { TypographyStylesProvider } from "@mantine/core";

const Community = () => {
  return (
    <PageLayout title="Community">
      <TypographyStylesProvider>
        <Content />
      </TypographyStylesProvider>
    </PageLayout>
  );
};

export default Community;
