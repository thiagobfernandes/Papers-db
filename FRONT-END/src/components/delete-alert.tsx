import { Modal } from "antd";
import { ReactNode } from "react";

interface DeleteAlertProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  itemName?: string;
  children?: ReactNode;
}

export function DeleteAlert({
  open,
  onCancel,
  onConfirm,
  itemName = "este item",
  children,
}: DeleteAlertProps) {
  return (
    <Modal
      title="Confirmar exclusão"
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Sim, deletar"
      cancelText="Cancelar"
      okButtonProps={{ danger: true }}
    >
      {children ?? <p>Tem certeza que deseja deletar {itemName}?</p>}
    </Modal>
  );
}
