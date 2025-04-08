import { Text, NavLink as MNavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Icon } from "@tabler/icons-react";
import { ReactNode } from "react";
import { Link, useRoute } from "wouter";

type NavLinkProps = {
  // Where this NavLink will go on click
  to: string;
  // What paths this NavLink will appear 'active' for
  match?: string;

  label: string;
  Icon: Icon;

  startOpen?: boolean;

  children?: ReactNode;
};

const NavLink = ({
  to,
  match,
  label,
  Icon,
  startOpen,
  children,
}: NavLinkProps) => {
  const [opened, { toggle }] = useDisclosure(startOpen);
  const [isMatch] = useRoute(match ?? to);

  return (
    <MNavLink
      label={<Text fw="bold">{label}</Text>}
      leftSection={<Icon size={18} stroke={2.75} />}
      variant="subtle"
      active={isMatch}
      opened={opened}
      onChange={toggle}
      component={Link}
      to={to}
    >
      {children}
    </MNavLink>
  );
};

export default NavLink;
