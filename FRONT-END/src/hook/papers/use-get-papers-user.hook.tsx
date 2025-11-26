import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../lib/auth-context";
import {  getPapersUserHttpByIsAdmin } from "../../http/papers/get-papers-user.http";
import { PapersDTO } from "../../http/papers/dto/papers.dto";
import { useMessageApi } from "../../lib/message-provider";

export const useGetPapersUser = () => {
  const [papers, setPapers] = useState<PapersDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const messageApi = useMessageApi();
  const { userId } = useAuth();
  const token = localStorage.getItem("authToken");


  const getPapers = useCallback(async () => {
    setLoading(true);
    try {
      const data =  await getPapersUserHttpByIsAdmin(
        page,
        pageSize,
        token ?? undefined,
        userId
      );
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
  }, [page, pageSize, token, messageApi, userId]);

  useEffect(() => {
    if (userId) {
      getPapers();
    }
  }, [getPapers, userId]);

  return {
    papers,
    loading,
    page,
    pageSize,
    total,
    setPage,
    setPageSize,
    refetch: getPapers,
  };
};
