import { useForm } from "react-hook-form";
import { Alert, Button, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { FileInput } from "../../components/FileInput";
import { TextInput } from "../../components/TextInput";
import { IconExclamationCircle } from "@tabler/icons-react";

export type TransferFormHandler = (
  data: FileFormData,
  setError: (err: string | null) => void
) => void;

type TransferFormProps = {
  mode: "upload" | "download";
  onSubmit: TransferFormHandler;
};

export type FileFormData = {
  file?: File | null;
  path: string;
};

const TransferForm = ({ mode, onSubmit }: TransferFormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FileFormData>({
    defaultValues: {
      file: null,
      path: "",
    },
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "download") {
      setValue("file", null);
    }
  }, [mode, setValue]);

  const handleFormSubmit = (data: FileFormData) => {
    onSubmit(data, setError);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack>
        {error && (
          <Alert
            variant="light"
            color="red"
            title="Transfer Failed"
            icon={<IconExclamationCircle />}
          >
            {error}
          </Alert>
        )}

        {mode === "upload" && (
          <FileInput
            name="file"
            control={control}
            placeholder="Pick file"
            label="File to Upload"
            rules={{ required: true }}
            error={errors.file?.message}
          />
        )}

        <TextInput
          name="path"
          control={control}
          label="Path"
          placeholder="/destination/path"
          rules={{ required: true }}
          error={errors.path?.message}
        />

        <Button type="submit" mt="sm">
          {mode === "upload" ? "Upload" : "Download"}
        </Button>
      </Stack>
    </form>
  );
};

export default TransferForm;
