import { Select } from "antd";
import { useEffect, useState } from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { PlatformDTO } from "../http/platforms/dto/platforms.dto";
import { useGetAllPlatforms } from "../hook/platform/use-get-all-platform.http";

type PlatformSelectProps<T extends FieldValues> = {
  field: ControllerRenderProps<T, Path<T>>;
};

export function PlatformSelect<T extends FieldValues>({
  field,
}: PlatformSelectProps<T>) {
  const { platforms, loading } = useGetAllPlatforms();
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );

  useEffect(() => {
    if (platforms) {
      const mapped = platforms.map((p: PlatformDTO) => ({
        label: p.name,
        value: p.id.toString(),
      }));
      setOptions(mapped);
    }
  }, [platforms]);

  return (
    <Select
      {...field}
      loading={loading}
      options={options}
      placeholder="Selecione a plataforma"
    />
  );
}
