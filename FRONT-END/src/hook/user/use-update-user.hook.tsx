import { useState } from "react";
import { useMessageApi } from "../../lib/message-provider";
import { UpdateUserDTO } from "../../http/user/dto/user.dto";
import { updateUserHttp } from "../../http/user/update-user.http";
import axios from "axios";
import { useAuth } from "../../lib/auth-context";

interface Props {
  userId: number | null;
}

export const useUpdateUser = ({ userId }: Props) => {
  const [loading, setLoading] = useState(false);
  const messageApi = useMessageApi();
  const {login,token} = useAuth();

  const [errors, setErrors] = useState<{
    email?: string;
    cpf?: string;
    username?: string;
  }>({});

  const updateUser = async (data: UpdateUserDTO) => {
    setLoading(true);
    setErrors({});

    try {
      console.log("useUpdateUser - data to update:", data);
      const result = await updateUserHttp({ data, userId, token });
      login(result.data.content.accessToken);
      messageApi.success("Usuário atualizado com sucesso!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          const errorMessage = error.response.data.message;
          if (errorMessage.includes("CPF")) {
            setErrors({ cpf: "Este CPF já está cadastrado" });
          } else {
            messageApi.error(errorMessage || "Erro ao registrar");
          }
        } else {
          messageApi.error("Erro ao conectar com o servidor");
        }
      } else if (error instanceof Error) {
        messageApi.error("Erro: " + error.message);
      } else {
        messageApi.error("Erro desconhecido ao registrar");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    updateUser,
    errors,
    setErrors,
    loading,
  };
};
