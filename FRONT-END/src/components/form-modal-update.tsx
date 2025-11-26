import { Modal, Button } from "antd";
import { useState } from "react";
import { FormPapers } from "../pages/papers/form/form-papers";
import { PapersDTO } from "../http/papers/dto/papers.dto";

interface FormModalUpdateProps {
  type: "papers" 
  data:  PapersDTO  
  onSuccess: () => void;
}

export const FormModalUpdate = ({
  type,
  data,
  onSuccess,
}: FormModalUpdateProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const renderForm = () => {
    switch (type) {
      
      case "papers":
        return (
          <FormPapers
            onCancel={handleClose}
            onSuccess={onSuccess}
            defaultValues={data}
            isEditing
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      <Button type="link" size="small" onClick={handleOpen}>
        ✏️
      </Button>

      <Modal
        title={`Editar ${type}`}
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
      >
        {renderForm()}
      </Modal>
    </>
  );
};
