import { SimpleGrid } from "@mantine/core";
import PageLayout from "src/layouts/PageLayout";
import InstallerCard from "./InstallerCard";
import { useQueryInstallers } from "src/hooks/query/installer";

const Installers = () => {
  const installers = useQueryInstallers();

  return (
    <PageLayout title="Installers" warnAdbDisconnected>
      <SimpleGrid cols={{ base: 1, xl: 2 }}>
        {installers.map((installer, i) => {
          {
            /* TODO: better key */
          }
          return <InstallerCard key={i} installerQuery={installer} />;
        })}
      </SimpleGrid>
    </PageLayout>
  );
};

export default Installers;
