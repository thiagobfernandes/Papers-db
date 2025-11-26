import { useState } from "react";
import { deletePaperHttp } from "../../http/papers/delete-paper.http";
import { useMessageApi } from "../../lib/message-provider";

export const useDeletePaper = () => {
  const [loading, setLoading] = useState(false);
  const messageApi = useMessageApi();
  const token = localStorage.getItem("authToken");

  const deletePaper = async (id: number): Promise<boolean> => {
    setLoading(true);
    try {
      await deletePaperHttp(id, token ?? undefined);
      messageApi.success("Paper deletado com sucesso!");
      return true;
    } catch (error) {
      messageApi.error("Erro ao deletar paper. " + error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    deletePaper,
    loading,
  };
};
