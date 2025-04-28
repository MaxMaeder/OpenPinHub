import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import { bgStyle } from "../../assets/bgStyles";
import { useLocation } from "wouter";

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const [opened, { toggle, close }] = useDisclosure();
  const [location] = useLocation();

  useEffect(() => {
    // Close navbar & reset scroll when the location changes
    close();
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

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

      <AppShell.Main
        style={{ display: "flex", position: "relative", ...bgStyle }}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
