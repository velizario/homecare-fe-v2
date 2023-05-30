import { ReactNode, useCallback, useEffect, useState } from "react";
import ModalContainer from "./ModalContainer";
import BackDrop from "./BackDrop";

type useFeedbackProps = {
  children: ReactNode;
};

export default function useFeedback() {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false)
  const openModal = () => setModalOpen(true)

  const Modal = useCallback(
    ({ children }: useFeedbackProps) => {
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
    },
    [modalOpen]
  );

  return { openModal, closeModal, Modal };
}
