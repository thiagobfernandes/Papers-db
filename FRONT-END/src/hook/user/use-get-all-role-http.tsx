import { useEffect, useState } from "react";
import { useMessageApi } from "../../lib/message-provider";


export type UserRoleDTO = {
  id: number;
  name: string;
  isAdmin?: boolean;
}

export const useGetAllUserRole = () => {
  const [userRole, setUserRole] = useState<UserRoleDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const messageApi = useMessageApi();

  useEffect(() => {

    const fetchPlatforms = async () => {
      try {
        const data = [
          { id: 1, name: "Usuário", isAdmin: false },
          { id: 2, name: "Administrador", isAdmin: true}
        ]
        setUserRole(data);
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

  return { userRole, loading };
};
