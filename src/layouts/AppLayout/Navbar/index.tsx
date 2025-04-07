import { AppShell, Stack } from "@mantine/core";
import ConnDetails from "./ConnDetails";
import { IconBook2 } from "@tabler/icons-react";
import NavLink from "./NavLink";

const Navbar = () => {
  return (
    <AppShell.Navbar p="xs">
      <AppShell.Section mb="md">
        <ConnDetails />
      </AppShell.Section>
      <AppShell.Section>
        <Stack gap={0}>
          <NavLink label="About" Icon={IconBook2} to="/about">
            <NavLink label="OpenPin" Icon={IconBook2} to="/about/openpin" />
            <NavLink
              label="Interposers"
              Icon={IconBook2}
              to="/about/interposers"
            />
            <NavLink label="Community" Icon={IconBook2} to="/about/community" />
          </NavLink>
          <NavLink
            label="Installers"
            Icon={IconBook2}
            to="/installers"
            match="/installers/*?"
          />
          <NavLink label="Console" Icon={IconBook2} to="/console" />
          <NavLink label="Settings" Icon={IconBook2} to="/settings" />
        </Stack>
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default Navbar;
