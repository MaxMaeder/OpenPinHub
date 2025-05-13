import { Paper, PaperProps, TypographyStylesProvider } from "@mantine/core";
import Markdown from "react-markdown";
import { useQueryAsset } from "src/hooks/query/asset";
import { QueryStateHandler } from "./QueryStateHandler";

interface MdDocProps extends PaperProps {
  assetUrl: string;
}

const MdDoc = ({ assetUrl, ...props }: MdDocProps) => {
  const markdownQuery = useQueryAsset(assetUrl);

  return (
    <Paper display="flex" withBorder p="md" {...props}>
      <QueryStateHandler query={markdownQuery}>
        {(markdown) => (
          <TypographyStylesProvider>
            <Markdown>{markdown}</Markdown>
          </TypographyStylesProvider>
        )}
      </QueryStateHandler>
    </Paper>
  );
};

export default MdDoc;
