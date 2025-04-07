import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import { bgStyle } from "../../assets/bgStyles";

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <Header opened={opened} onClick={toggle} />
      <Navbar />

      <AppShell.Main style={{ ...bgStyle }}>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
