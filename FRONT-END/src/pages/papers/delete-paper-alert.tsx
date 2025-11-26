import { Button, message, Modal } from "antd";
import { useState } from "react";
import { useDeletePaper } from "../../hook/papers/use-delete-paper.hook";

interface DeletePaperAlertProps {
  id: number;
  onSuccess: () => void;
}

export function DeletePaperAlert({ id, onSuccess }: DeletePaperAlertProps) {
  const { deletePaper } = useDeletePaper();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deletePaper(id);
      message.success("Paper deletado com sucesso!");
      onSuccess();
    } catch (error) {
      message.error("Erro ao deletar paper." + error);
      setOpen(false);
    }
  };

  return (
    <>
      <Button size="small" type="text" danger onClick={showModal}>
        🗑️
      </Button>
      <Modal
        title="Confirmar exclusão"
        open={open}
        onOk={handleDelete}
        confirmLoading={loading}
        onCancel={handleCancel}
        okText="Sim, deletar"
        cancelText="Cancelar"
      >
        Tem certeza que deseja deletar este paper?
      </Modal>
    </>
  );
}
