import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/auth-context";
import { useMessageApi } from "../../lib/message-provider";

const loginSchema = z.object({
  email: z.string().min(1, "Email obrigatório").email("Email inválido"),
  password: z.string().min(1, "Senha obrigatória"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const messageApi = useMessageApi();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await axios.post("/api/login", {
        email: data.email,
        password: data.password,
      });
      const token = response.data.content;

      login(token);
      navigate("/papers");
      messageApi.success("Login realizado com sucesso.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400 || status === 403) {
          messageApi.error("Email ou senha inválidos.");
        } else {
          messageApi.error("Erro ao fazer login. Tente novamente.");
        }
      } else {
        messageApi.error("Erro inesperado.");
      }
    }
  };

  return (
    <div className="flex h-full justify-center items-center bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Acessar Conta
        </h2>
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
          >
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input {...field} placeholder="Digite seu email" />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Senha"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input.Password {...field} placeholder="Digite sua senha" />
              )}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              style={{ fontWeight: "500" }}
            >
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            <Button block type="link" onClick={() => navigate("/register")}>
              Criar nova conta
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
