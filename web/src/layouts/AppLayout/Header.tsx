import { AppShell, Burger, Group, Image } from "@mantine/core";
import Logo from "../../assets/logo.svg";

type HeaderProps = {
  opened: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Header = ({ opened, onClick }: HeaderProps) => {
  return (
    <AppShell.Header p={{ base: "md", md: "sm" }}>
      <Group h="100%">
        <Burger opened={opened} onClick={onClick} hiddenFrom="sm" size="sm" />
        <Image
          src={Logo}
          h="100%"
          fit="contain"
          pt={{ base: 3, md: 2 }}
          ml="xs"
        />
      </Group>
    </AppShell.Header>
  );
};

export default Header;
