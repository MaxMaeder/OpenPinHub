import { SimpleGrid } from "@mantine/core";
import PageLayout from "src/layouts/PageLayout";
import { useAppDispatch, useAppSelector } from "src/state/hooks";
import {
  fetchInstallers,
  selectInstallers,
} from "src/state/slices/installersSlice";
import InstallerCard from "./InstallerCard";
import { useEffect } from "react";
import { fetchInstallerFromRepoUrl } from "src/services/installer";
import { useQueries } from "@tanstack/react-query";

const Installers = () => {
  const ids = [
    "https://github.com/MaxMaeder/DriveBackupV2",
    "https://github.com/MaxMaeder/OpenPin",
  ];
  const installers = useQueries({
    queries: ids.map((url) => ({
      queryKey: ["installer", url],
      queryFn: () => fetchInstallerFromRepoUrl(url),
    })),
  });
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(fetchInstallers());
  // }, []);

  // const installers = useAppSelector(selectInstallers);

  return (
    <PageLayout title="Installers" warnAdbDisconnected>
      <SimpleGrid cols={{ base: 1, xl: 2 }}>
        {installers.map((installer) => {
          if (!installer.data) return <p>error</p>;
          return <InstallerCard installer={installer.data} />;
        })}
      </SimpleGrid>
    </PageLayout>
  );
};

export default Installers;
