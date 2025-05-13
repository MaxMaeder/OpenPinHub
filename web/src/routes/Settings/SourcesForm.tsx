import { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { Button } from "@mantine/core";
import SourceField from "./SourceField";
import PageSection from "../../components/PageSection";
import { useSources, useSourcesActions } from "src/hooks/state/sourceStore";

interface FormValues {
  sources: { url: string }[];
}

export default function SourcesForm() {
  const savedSources = useSources();
  const { setSources } = useSourcesActions();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      sources: [...savedSources.map((s) => ({ url: s })), { url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "sources",
    control,
  });

  // Re-render when the "sources" field changes.
  const sources = useWatch({ control, name: "sources" });

  // Always ensure there is a blank field at the end.
  useEffect(() => {
    const lastUrl = sources[sources.length - 1]?.url.trim();

    if (lastUrl) {
      append({ url: "" }, { shouldFocus: false });
    }
  }, [sources, append]);

  const onSubmit = (data: FormValues) => {
    // Filter out empty URLs
    const filteredSources = data.sources
      .filter((s) => s.url.trim() !== "")
      .map((s) => s.url);
    setSources(filteredSources);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageSection title="Installer Sources">
        {fields.map((field, index) => (
          <SourceField
            key={field.id}
            index={index}
            control={control}
            error={errors.sources?.[index]?.url?.message}
            remove={remove}
            // Hide the delete button on the last (blank) field.
            isRemovable={fields.length > 1 && index !== fields.length - 1}
          />
        ))}
        <Button type="submit">Save Sources</Button>
      </PageSection>
    </form>
  );
}
