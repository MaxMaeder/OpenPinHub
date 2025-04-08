import { SimpleGrid } from "@mantine/core";
import PageLayout from "src/layouts/PageLayout";
import { useAppDispatch, useAppSelector } from "src/state/hooks";
import {
  fetchInstallers,
  selectInstallers,
} from "src/state/slices/installersSlice";
import InstallerCard from "./InstallerCard";
import { useEffect } from "react";

const Installers = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchInstallers());
  }, []);

  const installers = useAppSelector(selectInstallers);

  return (
    <PageLayout title="Installers" warnAdbDisconnected>
      <SimpleGrid cols={{ base: 1, xl: 2 }}>
        {installers.map((installer) => (
          <InstallerCard installer={installer} />
        ))}
      </SimpleGrid>
    </PageLayout>
  );
};

export default Installers;
