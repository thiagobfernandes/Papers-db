import { Pagination } from "antd";

interface PaginationComponentProps {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize: number) => void;
}

export function Paginated({
  current,
  pageSize,
  total,
  onChange,
}: PaginationComponentProps) {
  return (
    <div className="flex justify-center mt-4">
      <Pagination
        current={current}
        pageSize={pageSize}
        total={total}
        showSizeChanger
        onChange={onChange}
      />
    </div>
  );
}
