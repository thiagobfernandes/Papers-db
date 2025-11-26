import { useState } from "react";
import { PapersDTO, UpdatePaperDTO } from "../../http/papers/dto/papers.dto";
import { updatePaperHttp } from "../../http/papers/update-paper.http";
import { useMessageApi } from "../../lib/message-provider";

export const useUpdatePaper = () => {
  const [loading, setLoading] = useState(false);
  const messageApi = useMessageApi();
  const token = localStorage.getItem("authToken");

  const updatePaper = async (
    id: number,
    data: UpdatePaperDTO
  ): Promise<PapersDTO | null> => {
    setLoading(true);
    try {
      const result = await updatePaperHttp(id, data, token ?? undefined);
      messageApi.success("Paper atualizado com sucesso!");
      return result;
    } catch (error) {
      messageApi.error("Erro ao atualizar paper. " + error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updatePaper,
    loading,
  };
};
