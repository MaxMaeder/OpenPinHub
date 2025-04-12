import { Button } from "@mantine/core";
import BaseCard from "../BaseCard";
import { useCallback } from "react";
import { openConfirmModal } from "src/modals";
import { useAdb } from "src/context/AdbProvider";

const RebootCard = () => {
  const { connInfo, reboot } = useAdb();
  const isConn = connInfo != null;

  const handleReboot = useCallback(async () => {
    await openConfirmModal(
      "Confirm Reboot",
      "Are you sure you want to reboot your Pin now?"
    );
    reboot();
  }, []);

  return (
    <BaseCard title="Reboot Pin" description="Reboot connected Pin">
      {isConn ? (
        <Button onClick={handleReboot}>Reboot Now</Button>
      ) : (
        <Button disabled>No Pin Connected</Button>
      )}
    </BaseCard>
  );
};

export default RebootCard;
