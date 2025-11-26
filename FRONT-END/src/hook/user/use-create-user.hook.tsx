import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMessageApi } from "../../lib/message-provider";
import { CreateUserDTO } from "../../http/user/dto/user.dto";
import { createUserHttp } from "../../http/user/create-user.http";
import axios from "axios";

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const messageApi = useMessageApi();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{
    email?: string;
    cpf?: string;
    username?: string;
  }>({});

  const createUser = async (data: CreateUserDTO) => {
    setLoading(true);
    setErrors({});

    try {
      await createUserHttp(data);
      messageApi.success("Usuário registrado com sucesso!");
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          const errorMessage = error.response.data.message;
          if (errorMessage.includes("cpf")) {
            setErrors({ cpf: "Este CPF já está cadastrado" });
          } else if (errorMessage.includes("email")) {
            setErrors({ email: "Este e-mail já está cadastrado" });
          } else if (errorMessage.includes("username")) {
            setErrors({ username: "Este nome de usuário já está em uso" });
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
    setErrors,
    createUser,
    loading,
    errors,
  };
};
