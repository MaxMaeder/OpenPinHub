import { Paper } from "@mantine/core";

type YouTubeEmbedProps = {
  videoId: string;
};

export const YouTubeEmbed = ({ videoId }: YouTubeEmbedProps) => {
  return (
    <Paper
      component="iframe"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
      style={{
        display: "block",
        aspectRatio: "16 / 9",
        width: "100%",
        maxWidth: 800,
      }}
      withBorder
    />
  );
};
