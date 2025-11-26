import { Modal, Button } from "antd";
import { useState } from "react";
import { FormPapers } from "../pages/papers/form/form-papers";

interface CreatePostModalProps {
  type: "papers" ;
  onSuccess: () => void;
}

export const FormModal = ({ type, onSuccess }: CreatePostModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const renderForm = () => {
    switch (type) {
   
      case "papers":
        return <FormPapers onCancel={handleClose} onSuccess={onSuccess} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Button type="primary" onClick={handleOpen} style={{ fontWeight: "500" }}>
        Criar novo
      </Button>

      <Modal
        title={`Criar novo ${type}`}
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
      >
        {renderForm()}
      </Modal>
    </>
  );
};
