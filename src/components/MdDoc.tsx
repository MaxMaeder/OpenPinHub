import { Paper } from "@mantine/core";
import { useEffect } from "react";
import Markdown from "react-markdown";

type MdDocProps = {
  assetUrl: string;
};

const MdDoc = ({ assetUrl }: MdDocProps) => {
  // const []
  // useEffect(() => {
  //   getGithubAsset(assetUrl);
  // }, [assetUrl]);

  return (
    <Paper>
      <Markdown></Markdown>
    </Paper>
  );
};
