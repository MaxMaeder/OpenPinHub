import { ActionIcon, Group } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { TextInput } from "src/components/TextInput";
import { GITHUB_URL_REGEX } from "src/config/sourceConfig";

interface SourceFieldProps {
  index: number;
  control: any;
  error: string | undefined;
  remove: (index: number) => void;
  isRemovable: boolean;
}

const SourceField = ({
  index,
  control,
  error,
  remove,
  isRemovable,
}: SourceFieldProps) => {
  return (
    <Group key={index} align="stretch">
      <TextInput
        placeholder="GitHub Repository URL"
        w="500px"
        name={`sources.${index}.url`}
        control={control}
        rules={{
          validate: (value) =>
            !value ||
            GITHUB_URL_REGEX.test(value as string) ||
            "Enter a valid GitHub repository URL",
        }}
        error={error}
      />
      {isRemovable && (
        <ActionIcon size="input-sm" color="red" onClick={() => remove(index)}>
          <IconTrash size={16} />
        </ActionIcon>
      )}
    </Group>
  );
};

export default SourceField;
