import { AppShell, NavLink, Stack } from "@mantine/core";
import ConnDetails from "./ConnDetails";

const Navbar = () => {
  return (
    <AppShell.Navbar p="xs">
      <AppShell.Section mb="md">
        <ConnDetails />
      </AppShell.Section>
      <AppShell.Section>
        <Stack gap={0}>
          <NavLink label="First child link" />
          <NavLink label="First child link" />
          <NavLink label="First child link" />
        </Stack>
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default Navbar;
