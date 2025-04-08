import { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { Button } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "src/state/hooks";
import { setSources, selectAllSources } from "src/state/slices/sourcesSlice";
import SourceField from "./SourceField";
import Section from "./Section";

interface FormValues {
  sources: { url: string }[];
}

export default function SourcesForm() {
  const savedSources = useAppSelector(selectAllSources);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      sources: [
        ...savedSources.map((source) => ({ url: source.url })),
        { url: "" },
      ],
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
    if (
      !sources ||
      sources.length === 0 ||
      sources[sources.length - 1].url.trim() !== ""
    ) {
      append({ url: "" }, { shouldFocus: false });
    }
  }, [sources, append]);

  const onSubmit = (data: FormValues) => {
    // Filter out empty URLs and create Source objects using the URL as an ID.
    const filteredSources = data.sources
      .filter((s) => s.url.trim() !== "")
      .map((s) => ({ id: s.url, url: s.url }));
    dispatch(setSources(filteredSources));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Section title="Installer Sources">
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
      </Section>
    </form>
  );
}
