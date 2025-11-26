import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Button, DatePicker, Select, message, Spin } from "antd";
import { useAuth } from "../../lib/auth-context";
import { useUpdateUser } from "../../hook/user/use-update-user.hook";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useGetUser } from "../../hook/user/use-get-user.hook";
import { transformToMask } from "../../lib/utils";
import { MaskEnum } from "../../lib/enums";
import { UpdateUserSchema } from "./schemas/user.schema";
import { UserRoleSelect } from "../../components/user-role-select";

const { Option } = Select;

type ProfileFormSchema = z.infer<typeof UpdateUserSchema>;

export function UserPage() {
  const { logout, userId, isMaster } = useAuth();
  const {
    updateUser,
    loading,
    errors: apiErrors,
    setErrors,
  } = useUpdateUser({ userId });
  const { user, loading: loadingUser } = useGetUser({ userId });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormSchema>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      isAdmin: false,
      primaryPhone: "",
      secondaryPhone: "",
      dateOfBirth: undefined,
      genre: undefined,
    },
  });

  useEffect(() => {
    if (user) {
      const isValidDate = (date: Date) => {
        const d = new Date(date);
        return d instanceof Date && !isNaN(d.getTime());
      };

      reset({
        name: user.name || "",
        email: user.email || "",
        cpf: user.cpf
          ? user.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")
          : "",
        username: user.username || "",
        primaryPhone: user.primaryPhone || "",
        secondaryPhone: user.secondaryPhone || "",
        isAdmin: user.isAdmin || false,
        dateOfBirth: isValidDate(user.dateOfBirth)
          ? new Date(user.dateOfBirth)
          : undefined,
        genre: ["Masculino", "Feminino", "Outro"].includes(user.genre)
          ? (user.genre as "Masculino" | "Feminino" | "Outro")
          : undefined,
      });
    }
  }, [user, reset]);

  const onSubmit = async (values: ProfileFormSchema) => {
    try {
      console.log("update profile - values:", values);
      values.email = user?.email || "";
      await updateUser(values);
      message.success("Perfil atualizado com sucesso!");
    } catch {
      message.error("Erro ao atualizar perfil.");
    }
  };

  return (
    <div className="flex justify-center items-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-6 overflow-y-auto max-h-[734px]">
        <h2 className="text-2xl font-semibold mb-6 text-center">Meu Perfil</h2>

        {loadingUser ? (
          <div className="flex justify-center items-center h-40">
            <Spin tip="Carregando dados..." />
          </div>
        ) : (
          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <Form.Item
              label="Nome"
              validateStatus={errors.name ? "error" : ""}
              help={errors.name?.message}
            >
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Digite o nome completo"
                    onChange={(e) => {
                      field.onChange(e);
                      if (apiErrors.username) {
                        setErrors({ ...apiErrors, username: undefined });
                      }
                    }}
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              label="Email"
              validateStatus={errors.email ? "error" : ""}
              help={errors.email?.message}
            >
              <Controller
                name="email"
                control={control}
                disabled
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    placeholder="example@example.com"
                  />
                )}
              />
            </Form.Item>


            <Form.Item
              label="Usuário"
              validateStatus={errors.email ? "error" : ""}
              help={errors.email?.message}
            >
              <Controller
                name="username"
                control={control}
                render={({ field }) => <Input {...field} />}
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

            {
              isMaster ? (
                <Form.Item
                  label="Papel do Usuário"
                  validateStatus={errors.isAdmin ? "error" : ""}
                  help={errors.isAdmin?.message}
                >
                  <Controller
                    control={control}
                    name="isAdmin"
                    render={({ field }) => <UserRoleSelect field={field} />}
                  />
                </Form.Item>
              ) : (
                <></>
              )
            }

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
                      transformToMask(MaskEnum.DATE, () =>
                        field.onChange(date ? date.toDate() : undefined)
                      )
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
                  <Select {...field} placeholder="Selecione o gênero">
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
                style={{ fontWeight: "600" }}
                loading={loading}
              >
                {loading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="default"
                htmlType="submit"
                onClick={logout}
                style={{ fontWeight: "500" }}
                block
                loading={loading}
              >
                Logout
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
}
