import { Table } from "@radix-ui/themes";
import { ReactNode } from "react";

interface ColumnConfig<T> {
  title: string;
  render: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  loading?: boolean;
  emptyMessage?: string;
  actions?: (item: T) => ReactNode;
}

export function DataTable<T>({
  data,
  columns,
  loading = false,
  emptyMessage = "Nenhum dado encontrado.",
  actions,
}: DataTableProps<T>) {
  return (
    <Table.Root
      variant="surface"
      className="w-full min-w-max overflow-auto max-h-[calc(100vh-200px)]"
    >
      <Table.Header className="sticky top-0 bg-white z-10 shadow-sm">
        <Table.Row>
          {columns.map((col, i) => (
            <Table.ColumnHeaderCell key={i} className={col.className}>
              {col.title}
            </Table.ColumnHeaderCell>
          ))}
          {actions && <Table.ColumnHeaderCell>Ações</Table.ColumnHeaderCell>}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {!loading && data.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={columns.length + (actions ? 1 : 0)}>
              <div className="flex justify-center items-center py-6 text-gray-500">
                {emptyMessage}
              </div>
            </Table.Cell>
          </Table.Row>
        )}

        {!loading &&
          data.map((item, index) => (
            <Table.Row key={index}>
              {columns.map((col, i) => (
                <Table.Cell key={i} className={col.className}>
                  {col.render(item)}
                </Table.Cell>
              ))}
              {actions && (
                <Table.Cell className="flex gap-2">{actions(item)}</Table.Cell>
              )}
            </Table.Row>
          ))}
      </Table.Body>
    </Table.Root>
  );
}
