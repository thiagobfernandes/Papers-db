import { useCallback, useEffect, useState } from "react";
import { getUserHttp } from "../../http/user/dto/get-user.http";
import { UserDTO } from "../../http/user/dto/user.dto";
import { useMessageApi } from "../../lib/message-provider";

interface Props {
  userId: number | null;
}

export const useGetUser = ({ userId }: Props) => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const messageApi = useMessageApi();

  const getUser = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const data = await getUserHttp({ userId });
      setUser(data);
    } catch (error) {
      messageApi.error("Erro ao carregar os dados do usuário." + error);
    } finally {
      setLoading(false);
    }
  }, [messageApi, userId]);

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId, getUser]);

  return {
    user,
    loading,
    getUser,
  };
};
