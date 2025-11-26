import { Paginated } from "../../components/pagination";
import { useGetPapers } from "../../hook/papers/use-get-papers.hook";
import { DataTable } from "../../components/data-table";
import { PapersColumns } from "../../components/columns";

export function PapersPage() {
  const { papers, loading, page, pageSize, total, setPage, setPageSize } =
    useGetPapers();

 
  return (
    <div className="flex flex-col items-start gap-4 p-4">
      <h1 className="text-2xl font-bold">Papers Database Security Papers</h1>
      <div className="flex flex-col items-center w-full gap-4">
        <DataTable
          data={papers ?? []}
          columns={PapersColumns ?? []}
          loading={loading}
          emptyMessage="Nenhum papers encontrado."
        />
        <Paginated
          current={page}
          pageSize={pageSize}
          total={total}
          onChange={(newPage, newSize) => {
            setPage(newPage);
            setPageSize(newSize);
          }}
        />
      </div>
    </div>
  );
}
