import { useEffect, useState } from "react";
import { PlatformDTO } from "../../http/platforms/dto/platforms.dto";
import { useMessageApi } from "../../lib/message-provider";

export const useGetAllPlatforms = () => {
  const [platforms, setPlatforms] = useState<PlatformDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const messageApi = useMessageApi();

  useEffect(() => {

    const fetchPlatforms = async () => {
      try {
        const data = [
          { id: 1, name: "Windows", description: "Description A" },
          { id: 2, name: "Linux", description: "Description B" },
          { id: 3, name: "Mac", description: "Description C" },
          { id: 4, name: "Void Linux", description: "Description D" },
          { id: 5, name: "Pop Os", description: "Description E" },
          { id: 6, name: "Android", description: "Description F" },
        ]
        setPlatforms(data);
      } catch (error) {
        messageApi.open({
          type: "error",
          content: "Erro ao buscar papers. " + error,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPlatforms();
  }, [messageApi]);

  return { platforms, loading };
};
