import { Select, Stack } from "@mantine/core";
import { IconTag } from "@tabler/icons-react";
import { ReactNode, useMemo, useState } from "react";
import { InstallerRelease } from "src/services/installer";

type ReleaseSelectorProps = {
  releases: InstallerRelease[];
  selection: (release: InstallerRelease) => ReactNode;
  noSelection: ReactNode;
};

const ReleaseSelector = ({
  releases,
  selection,
  noSelection,
}: ReleaseSelectorProps) => {
  const [selectedRelease, setSelectedRelease] = useState<string | null>(null);

  const releaseOptions = useMemo(() => {
    if (!releases[0]) {
      return [];
    }

    if (!selectedRelease) {
      setSelectedRelease(releases[0].id.toString());
    }

    return releases.map((r) => ({
      value: r.id.toString(),
      label: r.name,
    }));
  }, [releases]);

  const release = useMemo(
    () => releases.find((r) => r.id.toString() == selectedRelease),
    [releases, selectedRelease]
  );

  return (
    <Stack align="start">
      <Select
        data={releaseOptions}
        value={selectedRelease}
        onChange={setSelectedRelease}
        leftSection={<IconTag size={16} />}
      />
      {release ? selection(release) : noSelection}
    </Stack>
  );
};

export default ReleaseSelector;
