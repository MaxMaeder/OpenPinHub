import { Center, Loader, Text, Title } from "@mantine/core";
import { UseQueryResult } from "@tanstack/react-query";

const QueryLoading = () => (
  <Center flex={1}>
    <Loader color="white" />
  </Center>
);

type QueryErrorProps = {
  error: Error;
};

const QueryError = ({ error }: QueryErrorProps) => (
  <Center flex={1}>
    <Title order={3} size="lg">
      Failed to Load
    </Title>
    <Text>{error.message}</Text>
  </Center>
);

type QueryStateHandlerProps<T> = {
  query: UseQueryResult<T, Error>;
  children: (data: T) => React.ReactNode;
  loading?: React.ReactNode;
  error?: (error: Error) => React.ReactNode;
};

export function QueryStateHandler<T>({
  query,
  children,
  loading = <QueryLoading />,
  error = (err) => <QueryError error={err} />,
}: QueryStateHandlerProps<T>) {
  if (query.isLoading) return <>{loading}</>;
  if (query.isError) return <>{error(query.error)}</>;
  if (!query.data) return null;

  return <>{children(query.data)}</>;
}
