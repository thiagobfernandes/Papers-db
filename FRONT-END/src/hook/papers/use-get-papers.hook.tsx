import { useCallback, useEffect, useState } from "react";
import { message } from "antd";
import { PapersDTO } from "../../http/papers/dto/papers.dto";
import { getPapersHttp } from "../../http/papers/get-papers.http";

export const useGetPapers = () => {
  const [papers, setPapers] = useState<PapersDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [messageApi] = message.useMessage();
  const token = localStorage.getItem("authToken");

  const getPapers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPapersHttp(page, pageSize, token ?? undefined);
      setPapers(data.papers);
      setTotal(data.total);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Erro ao buscar papers. " + error,
      });
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, token, messageApi]);

  useEffect(() => {
    getPapers();
  }, [getPapers]);

  return {
    papers,
    loading,
    page,
    pageSize,
    total,
    setPage,
    setPageSize,
  };
};
