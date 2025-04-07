import { Text, NavLink as MNavLink } from "@mantine/core";
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
  children?: ReactNode;
};

const NavLink = ({ to, match, label, Icon, children }: NavLinkProps) => {
  const [isMatch] = useRoute(match ?? to);

  return (
    <MNavLink
      label={<Text fw="bold">{label}</Text>}
      leftSection={<Icon size={18} stroke={2.75} />}
      variant="subtle"
      active={isMatch}
      component={Link}
      to={to}
    >
      {children}
    </MNavLink>
  );
};

export default NavLink;
