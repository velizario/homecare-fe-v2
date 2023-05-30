import { ReactNode, useCallback, useState } from "react";
import ModalContainer from "./ModalContainer";
import BackDrop from "./BackDrop";

type useFeedbackProps = {
  children: ReactNode;
};

export default function useFeedback() {
  // TODO: component is refreshed and reopened. Need to remember state between rerenders somehow e.g. useMemo

  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = useCallback(() => setModalOpen(false), []);

  const openModal = useCallback(() => setModalOpen(true), []);

  const Modal = ({ children }: useFeedbackProps) => {
    return (
      <>
        {modalOpen && (
          <div className="fixed inset-0 z-30 flex items-center justify-center">
            <BackDrop closeModal={closeModal} />
            <ModalContainer>{children}</ModalContainer>
          </div>
        )}
      </>
    );
  };

  return { openModal, closeModal, Modal };
}
