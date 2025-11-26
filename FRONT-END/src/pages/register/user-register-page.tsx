import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Button, DatePicker, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useCreateUser } from "../../hook/user/use-create-user.hook";
import { CreateUserDTO } from "../../http/user/dto/user.dto";
import { transformToMask } from "../../lib/utils";
import { MaskEnum } from "../../lib/enums";
import dayjs from "dayjs";
import { UserSchema } from "../user/schemas/user.schema";

const { Option } = Select;

type RegisterFormValues = Omit<z.infer<typeof UserSchema>, "secondaryPhone"> & {
  secondaryPhone?: string;
};

export function RegisterPage() {
  const navigate = useNavigate();
  const { createUser, loading, errors: apiErrors, setErrors } = useCreateUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      cpf: "",
      password: "",
      secondaryPhone: undefined,
      primaryPhone: "",
      dateOfBirth: undefined,
      genre: undefined,
    },
  });

  const onSubmit = async (data: CreateUserDTO) => {
    console.log(data);
    await createUser(data);
  };

  return (
    <div className="flex justify-center items-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-6 overflow-y-auto max-h-[734px]">
        <h2 className="text-2xl font-semibold mb-6 text-center">Criar Conta</h2>
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="Nome"
            validateStatus={errors.name ? "error" : ""}
            help={errors.name?.message}
          >
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input {...field} placeholder="Digite o nome completo" />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Usuário"
            validateStatus={errors.username ? "error" : ""}
            help={errors.username?.message}
          >
            <Controller
              control={control}
              name="username"
              render={({ field }) => (
                <Input {...field} placeholder="Digite o nome de usuario" />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            validateStatus={errors.email || apiErrors.email ? "error" : ""}
            help={errors.email?.message || apiErrors.email}
          >
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="example@example.com"
                  onChange={(e) => {
                    field.onChange(e);
                    if (apiErrors.email) {
                      setErrors({ ...apiErrors, email: undefined });
                    }
                  }}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="CPF"
            validateStatus={errors.cpf || apiErrors.cpf ? "error" : ""}
            help={errors.cpf?.message || apiErrors.cpf}
          >
            <Controller
              control={control}
              name="cpf"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={MaskEnum.CPF}
                  onChange={(e) => {
                    const maskedEvent = transformToMask(
                      MaskEnum.CPF,
                      field.onChange
                    )(e);
                    if (apiErrors.cpf) {
                      setErrors({ ...apiErrors, cpf: undefined });
                    }
                    return maskedEvent;
                  }}
                />
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
                <Input.Password
                  {...field}
                  placeholder="Digite uma senha segura"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Confirmar senha"
            validateStatus={errors.confirmPassword ? "error" : ""}
            help={errors.confirmPassword?.message}
          >
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <Input.Password {...field} placeholder="Confirme sua senha" />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Telefone Principal"
            validateStatus={errors.primaryPhone ? "error" : ""}
            help={errors.primaryPhone?.message}
          >
            <Controller
              control={control}
              name="primaryPhone"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={MaskEnum.PHONE}
                  onChange={transformToMask(MaskEnum.PHONE, field.onChange)}
                />
              )}
            />
          </Form.Item>

          <Form.Item label="Telefone Secundário">
            <Controller
              control={control}
              name="secondaryPhone"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={MaskEnum.PHONE}
                  onChange={transformToMask(MaskEnum.PHONE, field.onChange)}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Data de Nascimento"
            validateStatus={errors.dateOfBirth ? "error" : ""}
            help={errors.dateOfBirth?.message}
          >
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <DatePicker
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY"
                  placeholder={MaskEnum.DATE}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) =>
                    field.onChange(date ? date.toDate() : undefined)
                  }
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Gênero"
            validateStatus={errors.genre ? "error" : ""}
            help={errors.genre?.message}
          >
            <Controller
              control={control}
              name="genre"
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Selecione o gênero"
                  data-testid="select-genre"
                >
                  <Option value="Masculino">Masculino</Option>
                  <Option value="Feminino">Feminino</Option>
                  <Option value="Outro">Outro</Option>
                </Select>
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
              loading={loading}
            >
              Registrar
            </Button>
          </Form.Item>

          <Form.Item>
            <Button block type="link" onClick={() => navigate("/login")}>
              Já tem uma conta? Faça login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
