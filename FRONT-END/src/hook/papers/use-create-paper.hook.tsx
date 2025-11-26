import { useState } from "react";
import { createPapersHttp } from "../../http/papers/create-paper.http";
import { PapersDTO } from "../../http/papers/dto/papers.dto";
import { useMessageApi } from "../../lib/message-provider";

export const useCreatePapers = () => {
  const [loading, setLoading] = useState(false);
  const messageApi = useMessageApi();
  const token = localStorage.getItem("authToken");

  const createPapers = async (
    data: FormData
  ): Promise<PapersDTO | null> => {
    setLoading(true);
    try {
      const result = await createPapersHttp(data, token ?? undefined);
      messageApi.success("Paper criado com sucesso!");
      return result;
    } catch (error:any) {
      messageApi.error("Erro ao criar paper. " + error.response.data.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createPapers,
    loading,
  };
};