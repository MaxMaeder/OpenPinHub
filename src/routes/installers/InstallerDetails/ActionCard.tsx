import { Button } from "@mantine/core";
import {
  getActionSlug,
  InstallerAction,
  InstallerRelease,
} from "src/services/installer";
import { Link } from "wouter";
import BaseCard from "./BaseCard";

type ActionCardProps = {
  release: InstallerRelease;
  action: InstallerAction;
};

const ActionCard = ({ release, action }: ActionCardProps) => {
  const actionSlug = getActionSlug(action);

  return (
    <BaseCard title={action.title} description={action.description}>
      <Button component={Link} to={`/${release.id}/${actionSlug}`}>
        Run Action
      </Button>
    </BaseCard>
  );
};

export default ActionCard;
