import { Title, TitleProps } from "@mantine/core";

const PageHeading = (props: TitleProps) => (
  <Title order={3} size="lg" {...props}>
    {props.children}
  </Title>
);

export default PageHeading;
