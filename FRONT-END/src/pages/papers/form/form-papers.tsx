import { z } from "zod";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Button } from "antd";
import { paperSchema } from "../schemas/papers.schema";
import { useCreatePapers } from "../../../hook/papers/use-create-paper.hook";
import { useUpdatePaper } from "../../../hook/papers/use-update-paper.hook";
import { PlatformSelect } from "../../../components/platform-select";

type PaperFormSchema = z.infer<typeof paperSchema>;
type PaperFormSchemaInput = z.input<typeof paperSchema>;

interface Props {
  onCancel: () => void;
  onSuccess: () => void;
  defaultValues?: Partial<PaperFormSchema>;
  isEditing?: boolean;
}

export const FormPapers = ({
  onCancel,
  onSuccess,
  defaultValues,
  isEditing = false,
}: Props) => {
  const { createPapers, loading: loadingCreate } = useCreatePapers();
  const { updatePaper, loading: loadingUpdate } = useUpdatePaper();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PaperFormSchemaInput, unknown, PaperFormSchema>({
    resolver: zodResolver(paperSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      language: defaultValues?.language ?? "",
      platformId: defaultValues?.platformId?.toString() ?? "",
      id: defaultValues?.id,
    },
  });

  const onSubmit = async (values: PaperFormSchema) => {
    const { id, document, ...data } = values; 

    if (isEditing && id) {
      await updatePaper(id, data);
    } else {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("language", data.language);
      formData.append("platformId", data.platformId.toString());

      if (document && document.length > 0) {
        formData.append("document", document[0].originFileObj);
      }

      await createPapers(formData);
    }

    reset();
    onCancel();
    onSuccess();
  };
  const loading = isEditing ? loadingUpdate : loadingCreate;

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)} encType={!isEditing ? "multipart/form-data" : undefined}>
      <Form.Item
        label="Título"
        validateStatus={errors.title ? "error" : ""}
        help={errors.title?.message}
      >
        <Controller
          control={control}
          name="title"
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Linguagem"
        validateStatus={errors.language ? "error" : ""}
        help={errors.language?.message}
      >
        <Controller
          control={control}
          name="language"
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Plataforma"
        validateStatus={errors.platformId ? "error" : ""}
        help={errors.platformId?.message}
      >
        <Controller
          control={control}
          name="platformId"
          render={({ field }) => <PlatformSelect field={field} />}
        />
      </Form.Item>

      {!isEditing && (
        <Form.Item
          label="Documento (PDF, DOCX, TXT - Máx 5MB)"
          validateStatus={errors.document ? "error" : ""}
          help={errors.document?.message as string}
        >
          <Controller
            control={control}
            name="document"
            render={({ field: { onChange, value } }) => (
              <Upload
                beforeUpload={() => false}
                onChange={(info) => onChange(info.fileList)}
                fileList={value}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Selecionar Arquivo</Button>
              </Upload>
            )}
          />
        </Form.Item>
      )}

      <Form.Item className="text-right">
        <Button onClick={onCancel} style={{ marginRight: 8 }}>
          Cancelar
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          Salvar
        </Button>
      </Form.Item>
    </Form>
  );
};
