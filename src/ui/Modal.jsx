import { cloneElement } from "react";
import { useState } from "react";
import { createContext } from "react";
import Button from "./Button";
import { AiOutlineClose } from "react-icons/ai";
import { useContext } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useDetectOutsideClick";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = (name) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

Modal.Open = function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
};

Modal.Window = function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (openName !== name) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button variation="modalButton" onClick={close}>
          <AiOutlineClose />
        </Button>
        {cloneElement(children, {
          onCloseModal: close,
        })}
      </StyledModal>
    </Overlay>,
    document.body
  );
};

export default Modal;
