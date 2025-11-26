import { Select } from "antd";
import { useEffect, useState } from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { useGetAllUserRole, UserRoleDTO } from "../hook/user/use-get-all-role-http";

type UserRoleSelectProps<T extends FieldValues> = {
  field: ControllerRenderProps<T, Path<T>>;
};

export function UserRoleSelect<T extends FieldValues>({
  field,
}: UserRoleSelectProps<T>) {
  const { userRole , loading } = useGetAllUserRole();
  const [options, setOptions] = useState<{ label: string; value: boolean | undefined}[]>(
    []
  );

  useEffect(() => {
    if (userRole) {
      const mapped = userRole.map((p: UserRoleDTO) => ({
        label: p.name,
       value: p.isAdmin,

      }));
      setOptions(mapped);
    }
  }, [userRole]);

  return (
    <Select
      {...field}
      loading={loading}
      options={options}
      placeholder="Selecione o papel do usuário"
    />
  );
}
